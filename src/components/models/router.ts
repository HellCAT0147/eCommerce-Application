export type Callback = (isloggedIn?: boolean) => void;

export interface Routes {
  path: string;
  callback: Callback;
}

export interface UrlParsed {
  path: string;
  resource: string;
}

export enum Pages {
  GO_TO = `go-to`,
  MAIN = 'main',
  LOGIN = 'login',
  SIGN_OUT = 'sign-out',
  REGISTRATION = 'registration',
  CATALOG = 'catalog',
  PROFILE = 'profile',
  GO_TO_MAIN = `${GO_TO}-${MAIN}`,
  GO_TO_LOGIN = `${GO_TO}-${LOGIN}`,
  GO_TO_REG = `${GO_TO}-${REGISTRATION}`,
  NOT_FOUND = 'not-found',
}
