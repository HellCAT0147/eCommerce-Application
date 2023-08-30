import {
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';
import {
  Address,
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerSignInResult,
  MyCustomerUpdateAction,
  Product,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ErrorObject } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/error';
import TokenCachesStore from './token-caches-store';
import compareObjects from '../utils/compare-objects';
import DataBase from '../models/commerce';

export default class ECommerceApi {
  private readonly baseAuthParams: PasswordAuthMiddlewareOptions;

  private clientBuilder: ClientBuilder;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // Ignoring due to initialization in initClient function inside of constructor
  private ctpClient: Client;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // Ignoring due to initialization in initClient function inside of constructor
  private apiRoot: ByProjectKeyRequestBuilder;

  private readonly tokenCachesStore: TokenCachesStore;

  private meLoggedInPromise: Promise<Customer | null> | null = null;

  constructor(
    projectKey: string,
    clientId: string,
    clientSecret: string,
    region: string,
    tokenCachesStore: TokenCachesStore = new TokenCachesStore(),
    scopes: Array<string> | undefined = undefined
  ) {
    this.tokenCachesStore = tokenCachesStore;
    this.baseAuthParams = {
      host: `https://auth.${region}.commercetools.com`,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: {
          username: '',
          password: '',
        },
      },
      scopes,
      tokenCache: this.tokenCachesStore,
      fetch,
    };

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: `https://api.${region}.commercetools.com`,
      fetch,
    };

    // ClientBuilder
    this.clientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
    this.initClientAndApiRoot();
  }

  private initClientAndApiRoot(): void {
    const creds = this.tokenCachesStore.getDefault();
    let preClient: Client = this.clientBuilder.withAnonymousSessionFlow(this.baseAuthParams).build();

    if (creds !== this.tokenCachesStore.defaultTokenStore) {
      const authParams: RefreshAuthMiddlewareOptions = {
        ...this.baseAuthParams,
        refreshToken: creds.refreshToken as string,
        tokenCache: this.tokenCachesStore,
      };
      preClient = this.clientBuilder.withRefreshTokenFlow(authParams).build();
    }
    const preApiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(preClient).withProjectKey({
      projectKey: this.baseAuthParams.projectKey,
    });

    this.ctpClient = preClient;
    this.apiRoot = preApiRoot;

    if (creds !== this.tokenCachesStore.defaultTokenStore) {
      this.meLoggedInPromise = preApiRoot
        .me()
        .get()
        .execute()
        .then((result) => {
          if (result.statusCode !== 200) {
            this.tokenCachesStore.unset();
            this.initClientAndApiRoot();
            return null;
          }
          return result.body;
        })
        .catch(() => {
          this.tokenCachesStore.unset();
          this.initClientAndApiRoot();
          return null;
        });
    }
  }

  private errorObjectOrThrow(e: unknown): ErrorObject {
    if (e != null && typeof e === 'object') {
      const { message } = e as { message: string | undefined };

      if (message != null) {
        return e as ErrorObject;
      }
    }
    throw e;
  }

  private findAddress(addresses: Array<Address>, newCustomerAddresses: Array<Address>, index: number): Address | null {
    const originalAddress: Address = addresses[index];

    for (let i = 0; i < newCustomerAddresses.length; i += 1) {
      const newCustomerAddress = newCustomerAddresses[i];
      const originalAddressWithNewId: Address = {
        ...originalAddress,
        id: newCustomerAddress.id,
      };

      if (compareObjects(newCustomerAddress, originalAddressWithNewId)) {
        return newCustomerAddress;
      }
    }

    return null;
  }

  private async updateNewUserAddresses(
    addresses: Array<Address>,
    newCustomerAddresses: Array<Address>,
    billingAddressesIds: Array<number>,
    shippingAddressesIds: Array<number>,
    registrationResult: ClientResponse<CustomerSignInResult>
  ): Promise<void> {
    if (
      registrationResult.statusCode != null &&
      registrationResult.statusCode >= 200 &&
      registrationResult.statusCode < 300
    ) {
      const actions: Array<MyCustomerUpdateAction> = [];

      billingAddressesIds.forEach((i) => {
        const address = this.findAddress(addresses, newCustomerAddresses, i);
        if (address != null) {
          actions.push({ action: 'addBillingAddressId', addressId: address.id });
        }
      });
      shippingAddressesIds.forEach((i) => {
        const address = this.findAddress(addresses, newCustomerAddresses, i);
        if (address != null) {
          actions.push({ action: 'addShippingAddressId', addressId: address.id });
        }
      });

      await this.apiRoot
        .me()
        .post({
          body: {
            version: registrationResult.body.customer.version,
            actions,
          },
        })
        .execute();
    }
  }

  public async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    addresses: Array<Address>,
    billingAddressesIds: Array<number>,
    shippingAddressesIds: Array<number>,
    defaultBillingAddress: number | undefined,
    defaultShippingAddress: number | undefined
  ): Promise<ErrorObject | boolean> {
    const authParams = this.baseAuthParams;
    authParams.credentials.user.username = email;
    authParams.credentials.user.password = password;
    try {
      const registrationResult: ClientResponse<CustomerSignInResult> = await this.apiRoot
        .me()
        .signup()
        .post({
          body: {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth: `${dateOfBirth.getFullYear()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getDate()}`,
            addresses,
            defaultBillingAddress,
            defaultShippingAddress,
          },
        })
        .execute();
      this.logout();
      const loginResult = await this.login(email, password);
      if (loginResult === true) {
        await this.updateNewUserAddresses(
          addresses,
          registrationResult.body.customer.addresses,
          billingAddressesIds,
          shippingAddressesIds,
          registrationResult
        );
      } else {
        return loginResult;
      }
    } catch (e) {
      return this.errorObjectOrThrow(e);
    }
    return true;
  }

  public async login(email: string, password: string): Promise<ErrorObject | true> {
    const authParams: PasswordAuthMiddlewareOptions = { ...this.baseAuthParams }; // copy of base auth params
    authParams.credentials.user.username = email;
    authParams.credentials.user.password = password;

    try {
      this.ctpClient = this.clientBuilder.withPasswordFlow(authParams).build();
      const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({
        projectKey: this.baseAuthParams.projectKey,
      });

      const meResponse: ClientResponse<Customer> = await apiRoot.me().get().execute();

      if (meResponse.statusCode === 200) {
        this.apiRoot = apiRoot;
        return true;
      }
    } catch (e) {
      return this.errorObjectOrThrow(e);
    }
    return true;
  }

  public logout(): void {
    this.tokenCachesStore.clear();
    this.initClientAndApiRoot();
  }

  public async isLoggedIn(): Promise<boolean> {
    return (
      this.tokenCachesStore.getDefault() !== this.tokenCachesStore.defaultTokenStore &&
      this.meLoggedInPromise !== null &&
      (await this.meLoggedInPromise) !== null
    );
  }

  public async getProduct(key: string): Promise<Product | ErrorObject> {
    try {
      return (
        await this.apiRoot
          .products()
          .withKey({ key: `${DataBase.key_prefix}-${key}` })
          .get()
          .execute()
      ).body;
    } catch (e) {
      return this.errorObjectOrThrow(e);
    }
  }
}
