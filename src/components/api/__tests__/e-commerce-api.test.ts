import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { TokenStore } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import ECommerceApi from '../e-commerce-api';
import TokenCachesStore from '../token-caches-store';

const mockedLocalStorage: Storage = ((): Storage => {
  let store: { [key: string]: string } = {};
  return {
    key: (index: number): string | null => {
      return store.keys[index];
    },
    get length(): number {
      return store.keys.length;
    },
    getItem: (key: string): string | null => {
      return store[key];
    },

    setItem: (key: string, value: string): void => {
      store[key] = value;
    },

    clear: (): void => {
      store = {};
    },

    removeItem: (key: string): void => {
      delete store[key];
    },

    getAll: (): { [key: string]: string } => {
      return store;
    },
  };
})();

const fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  throw new Error('Fetch function should not be called at any time');
};
global.fetch = fetch;

const projectKey: string = 'projectKey';
const clientId: string = 'clientId';
const clientSecret: string = 'clientSecret';
const region: string = 'region';

const tokenCachesStore: TokenCachesStore = new TokenCachesStore(mockedLocalStorage);

const mockedClient = {};

const successAuthTokenCacheStorage: TokenStore = {
  token: 'token',
  refreshToken: 'refreshToken',
  expirationTime: Number.MAX_SAFE_INTEGER,
};

const mockedSuccessLoggedInClientResponse: ClientResponse<string> = {
  statusCode: 200,
  body: 'Ok',
};

const mockedGetMe = {
  execute: jest.fn().mockImplementation(async () => {
    return mockedSuccessLoggedInClientResponse;
  }),
};

const mockedMe = {
  get: jest.fn().mockImplementation(() => {
    return mockedGetMe;
  }),
};

const mockedByProjectKeyRequestBuilder = {
  me: jest.fn().mockImplementation(() => {
    return mockedMe;
  }),
};

const mockedApiRoot = {
  withProjectKey: jest.fn().mockImplementation((options) => {
    expect(options.projectKey).toEqual(projectKey);
    return mockedByProjectKeyRequestBuilder;
  }),
};

let newMockedClientBuilder: { [key: string]: jest.MockInstance<unknown, unknown[], unknown> } = {};
newMockedClientBuilder = {
  withHttpMiddleware: jest.fn().mockImplementation((httpMiddlewareOptions) => {
    expect(httpMiddlewareOptions.host).toEqual(`https://api.${region}.commercetools.com`);
    return newMockedClientBuilder;
  }),
  withLoggerMiddleware: jest.fn().mockImplementation(() => {
    return newMockedClientBuilder;
  }),
  withRefreshTokenFlow: jest.fn().mockImplementation((authParams) => {
    expect(authParams.refreshToken).toEqual(successAuthTokenCacheStorage.refreshToken);
    return newMockedClientBuilder;
  }),
  withAnonymousSessionFlow: jest.fn().mockImplementation((authParams) => {
    expect(authParams.host).toEqual(`https://auth.${region}.commercetools.com`);
    expect(authParams.projectKey).toEqual(projectKey);

    const { credentials } = authParams;

    expect(credentials.clientId).toEqual(clientId);
    expect(credentials.clientSecret).toEqual(clientSecret);

    expect(authParams.tokenCache).toEqual(tokenCachesStore);
    return newMockedClientBuilder;
  }),
  build: jest.fn().mockImplementation(() => {
    return mockedClient;
  }),
};
const MockedClientBuilder = jest.mocked(ClientBuilder, { shallow: true });
jest.mock('@commercetools/sdk-client-v2', () => {
  return {
    ClientBuilder: jest.fn().mockImplementation(() => {
      return newMockedClientBuilder;
    }),
  };
});

jest.mock('@commercetools/platform-sdk', () => {
  return {
    createApiBuilderFromCtpClient: jest.fn().mockImplementation((client) => {
      expect(client).toEqual(mockedClient);
      return mockedApiRoot;
    }),
  };
});

beforeEach(() => {
  mockedLocalStorage.clear();
  MockedClientBuilder.mockClear();
  newMockedClientBuilder.withHttpMiddleware.mockClear();
  newMockedClientBuilder.withRefreshTokenFlow.mockClear();
});

test('Anonymous client has been created correctly', () => {
  const api = new ECommerceApi(projectKey, clientId, clientSecret, region, tokenCachesStore);

  expect(MockedClientBuilder).toHaveBeenCalledTimes(1);
  expect(newMockedClientBuilder.withHttpMiddleware).toHaveBeenCalledTimes(1);
  expect(api.isLoggedIn()).resolves.toEqual(false);
});

test('Non anonymous client has been created correctly', async () => {
  tokenCachesStore.set(successAuthTokenCacheStorage, undefined);
  const api = new ECommerceApi(projectKey, clientId, clientSecret, region, tokenCachesStore);

  expect(await api.isLoggedIn()).toEqual(true);

  expect(MockedClientBuilder).toHaveBeenCalledTimes(1);
  expect(newMockedClientBuilder.withHttpMiddleware).toHaveBeenCalledTimes(1);
  expect(newMockedClientBuilder.withRefreshTokenFlow).toHaveBeenCalledTimes(1);
  expect(mockedGetMe.execute).toHaveBeenCalledTimes(1);
});
