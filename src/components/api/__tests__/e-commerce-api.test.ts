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

const mockedByProjectKeyRequestBuilder = {};

const mockedApiRoot = {
  withProjectKey: jest.fn().mockImplementation((options) => {
    expect(options.projectKey).toEqual(projectKey);
    return mockedByProjectKeyRequestBuilder;
  }),
};

let newMockedClientBuilder: { [key: string]: unknown } = {};
newMockedClientBuilder = {
  withHttpMiddleware: jest.fn().mockImplementation((httpMiddlewareOptions) => {
    expect(httpMiddlewareOptions.host).toEqual(`https://api.${region}.commercetools.com`);
    return newMockedClientBuilder;
  }),
  withLoggerMiddleware: jest.fn().mockImplementation(() => {
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

test('Anonymous client has been created correctly', () => {
  const api = new ECommerceApi(projectKey, clientId, clientSecret, region, tokenCachesStore);

  expect(api.isLoggedIn()).resolves.toEqual(false);
});
