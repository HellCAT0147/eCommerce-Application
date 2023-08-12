export type Callback = () => void;

export interface Routes {
  path: string;
  callback: Callback;
}

export interface UrlParsed {
  path: string;
  resource: string;
}

export enum Pages {
  MAIN = 'main',
  GO_TO_MAIN_PAGE = 'go-to-main-page',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  NOT_FOUND = 'not-found',
}
