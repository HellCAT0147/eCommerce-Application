import ControllerCatalog from '../controller';
import ECommerceApi from '../../../../api/e-commerce-api';
import TokenCachesStore from '../../../../api/token-caches-store';

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

test('controller is instance of ControllerCatalog', () => {
  const tokenCashesStore = new TokenCachesStore(localStorage);
  const api = new ECommerceApi('a', 'a', 'a', 'a', tokenCashesStore, ['a', 'a', 'a']);
  const controller = new ControllerCatalog(api);
  expect(controller).toBeInstanceOf(ControllerCatalog);
});
