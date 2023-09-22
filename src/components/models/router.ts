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
  CART = 'cart',
  GO_TO_MAIN = `${GO_TO}-${MAIN}`,
  GO_TO_LOGIN = `${GO_TO}-${LOGIN}`,
  GO_TO_REG = `${GO_TO}-${REGISTRATION}`,
  GO_TO_PROF = `${GO_TO}-${PROFILE}`,
  GO_TO_CATALOG = `${GO_TO}-${CATALOG}`,
  GO_TO_ABOUT = `${GO_TO}-${ABOUT_US}`,
  LOGO = 'logo',
  LOGO_MAIN = `${LOGO}-${MAIN}`,
  NOT_FOUND = 'not-found',
  ID = 'id',
  RSS = 'https://rs.school/',
  DESIGN = 'https://www.figma.com/file/pyriaNMaPDrvmzSicUinkm/Crisp?type=design&node-id=0-1&mode=design&t=qTbeRyjWZWTES6OB-0',
  PHOTOS = 'https://vk.com/lovely_style_spb',
}
