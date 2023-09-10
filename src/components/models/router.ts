export type Callback = (isLoggedIn?: boolean) => void;

export interface Routes {
  path: string;
  callback: Callback;
}

export interface UrlParsed {
  path: string;
  resource: string;
  details: string;
}

export enum Pages {
  GO_TO = `go-to`,
  MAIN = 'main',
  LOGIN = 'login',
  SIGN_OUT = 'sign-out',
  REGISTRATION = 'registration',
  CATALOG = 'catalog',
  PROFILE = 'profile',
  PRODUCT = 'product',
  ABOUT_US = 'about-us',
  GO_TO_MAIN = `${GO_TO}-${MAIN}`,
  GO_TO_LOGIN = `${GO_TO}-${LOGIN}`,
  GO_TO_REG = `${GO_TO}-${REGISTRATION}`,
  GO_TO_PROF = `${GO_TO}-${PROFILE}`,
  LOGO = 'logo',
  LOGO_MAIN = `${LOGO}-${MAIN}`,
  NOT_FOUND = 'not-found',
  ID = 'id',
}
