import {
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';
import { Address, ClientResponse, createApiBuilderFromCtpClient, Customer } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ErrorObject } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/error';
import TokenCachesStore from './token-caches-store';

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

  constructor(
    projectKey: string,
    clientId: string,
    clientSecret: string,
    region: string,
    tokenCachesStore: TokenCachesStore = new TokenCachesStore()
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
      scopes: undefined,
      tokenCache: this.tokenCachesStore,
      fetch,
    };

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: `https://api.${region}.commercetools.com`,
      fetch,
    };

    // ClientBuilder
    this.clientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions).withLoggerMiddleware(); // Include middleware for logging;
    this.initClient();
  }

  private createTcpClient(): Client {
    const creds = this.tokenCachesStore.getDefault();
    if (creds === null) {
      return this.clientBuilder.withAnonymousSessionFlow(this.baseAuthParams).build();
    }

    const authParams: RefreshAuthMiddlewareOptions = {
      ...this.baseAuthParams,
      refreshToken: creds.refreshToken as string,
      tokenCache: this.tokenCachesStore,
    };
    return this.clientBuilder.withRefreshTokenFlow(authParams).build();
  }

  private initClient(): void {
    this.ctpClient = this.createTcpClient();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({
      projectKey: this.baseAuthParams.projectKey,
    });
  }

  private checkError(e: unknown): ErrorObject | null {
    if (e != null && typeof e === 'object') {
      const { status } = e as { status: number | undefined };

      if (status != null) {
        return e as ErrorObject;
      }
    }
    return null;
  }

  public async login(email: string, password: string): Promise<ErrorObject | null> {
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
        return null;
      }
    } catch (e) {
      const castedE = this.checkError(e);
      if (castedE != null) {
        return castedE;
      }
      throw e;
    }
    return null;
  }

  public async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    addresses: Array<Address>,
    defaultBillingAddress: number = 0,
    defaultShippingAddress: number = 0
  ): Promise<ErrorObject | null> {
    const authParams = this.baseAuthParams;
    authParams.credentials.user.username = email;
    authParams.credentials.user.password = password;

    try {
      await this.apiRoot
        .me()
        .signup()
        .post({
          body: {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth: `${dateOfBirth.getFullYear()}-${dateOfBirth.getMonth()}-${dateOfBirth.getDay()}`,
            addresses,
            defaultBillingAddress,
            defaultShippingAddress,
          },
        })
        .execute();
    } catch (e) {
      const castedE = this.checkError(e);
      if (castedE != null) {
        return castedE;
      }
      throw e;
    }
    return null;
  }

  public logout(): void {
    this.tokenCachesStore.clear();
    this.initClient();
  }
}
