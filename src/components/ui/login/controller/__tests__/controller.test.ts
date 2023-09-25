import ECommerceApi from '../../../../api/e-commerce-api';
import TokenCachesStore from '../../../../api/token-caches-store';
import ControllerLogin from '../controller';

const localStorageMock: object = ((): object => {
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

const tokenCashesStore: TokenCachesStore = new TokenCachesStore(localStorage);
const api: ECommerceApi = new ECommerceApi('a', 'a', 'a', 'a', tokenCashesStore, ['a', 'a', 'a']);

test('controller is instance of ControllerCatalog', () => {
  const controller: ControllerLogin = new ControllerLogin(api);
  expect(controller).toBeInstanceOf(ControllerLogin);
});

test('controller is instance of ControllerCatalog', () => {
  const controller: ControllerLogin = new ControllerLogin(api);
  expect(controller.getAPI()).toEqual(api);
});
