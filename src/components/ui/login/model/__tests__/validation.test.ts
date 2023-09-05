import TokenCachesStore from '../../../../api/token-caches-store';
import ECommerceApi from '../../../../api/e-commerce-api';
import ValidationModel from '../validation';

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
const validationModel = new ValidationModel(api);

test('validationModel is instance of ValidationModel', () => {
  expect(validationModel).toBeInstanceOf(ValidationModel);
});

test('validationModel checks mail properly', () => {
  expect(validationModel.checkMail('test@test.test')).toBeTruthy();
  expect(validationModel.checkMail('test')).toBeFalsy();
});

test('validationModel checks password properly', () => {
  expect(validationModel.checkPassword('123')).toBeFalsy();
  expect(validationModel.checkPassword('1Qwerty!00')).toBeTruthy();
});
