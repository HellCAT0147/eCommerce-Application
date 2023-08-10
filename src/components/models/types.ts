export interface OptionRouter {
  mode: string;
  root: string;
}

// export type Callback<T> = (data: T) => void;

export type Callback = () => void;

export interface Routes {
  path: string;
  callback: Callback;
}

export interface UrlParsed {
  path: string;
  resource: string;
}
