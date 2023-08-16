import { TokenCacheOptions, TokenStore } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';

export default class TokenCachesStore {
  private storage: Storage;

  private readonly prefix: string = 'tokens_';

  private readonly defaultId: string = `${this.prefix}default`;

  public readonly defaultTokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
  };

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  public get(tokenCacheOptions?: TokenCacheOptions): TokenStore {
    let tokenStore: string | null;
    if (tokenCacheOptions == null) {
      tokenStore = this.storage.getItem(this.defaultId);
    } else {
      tokenStore = this.storage.getItem(`${this.prefix}${tokenCacheOptions.clientId}`);
    }
    if (tokenStore == null) {
      return this.defaultTokenStore;
    }
    return JSON.parse(tokenStore);
  }

  public getDefault(): TokenStore {
    return this.get(undefined);
  }

  public set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions): void {
    if (tokenCacheOptions == null) {
      this.storage.setItem(this.defaultId, JSON.stringify(cache));
    } else {
      this.storage.setItem(`${this.prefix}${tokenCacheOptions.clientId}`, JSON.stringify(cache));
    }
  }

  public unset(tokenCacheOptions?: TokenCacheOptions): void {
    if (tokenCacheOptions == null) {
      this.storage.removeItem(this.defaultId);
    } else {
      this.storage.removeItem(`${this.prefix}${tokenCacheOptions.clientId}`);
    }
  }

  public clear(): void {
    for (let i = 0; i < this.storage.length; i += 1) {
      const key = this.storage.key(i);

      if (key?.indexOf(this.prefix) === 0) {
        this.storage.removeItem(key);
        i -= 1;
      }
    }
  }
}
