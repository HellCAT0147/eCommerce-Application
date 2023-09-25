import ECommerceApi from '../../../../api/e-commerce-api';
import TokenCachesStore from '../../../../api/token-caches-store';
import ModelCatalog from '../model';

const localStorageMock = ((): object => {
  const store: { [key: string]: string } = {};
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

global.structuredClone = jest.fn((val) => {
  return JSON.parse(JSON.stringify(val));
});

test('model is instance of ModelCatalog', () => {
  const tokenCashesStore: TokenCachesStore = new TokenCachesStore(localStorage);
  const api: ECommerceApi = new ECommerceApi('a', 'a', 'a', 'a', tokenCashesStore, ['a', 'a', 'a']);
  const model: ModelCatalog = new ModelCatalog(api);
  expect(model).toBeInstanceOf(ModelCatalog);
});
