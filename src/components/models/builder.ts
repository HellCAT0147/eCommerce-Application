export enum Blocks {
  body = 'body',
  main = 'main',
  header = 'header',
  footer = 'footer',
  login = 'login',
  reg = 'registration',
  prof = 'profile',
  form = `form`,
  not_found = `not-found`,
  select = 'select',
  product = 'product',
  catalog = 'catalog',
}

export enum Elem {
  btn = 'button',
  nav = 'nav',
  form = `form`,
  field = `field`,
  input = `input`,
  label = `label`,
  title = `title`,
  logo = `logo`,
  err = 'error',
  errs = 'errors',
  number = 'number',
  circle = 'circle',
  go_home = 'go-home',
  address = 'address',
  select = 'select',
  option = 'option',
  text = 'text',
  check = 'check',
  link = 'link',
  wrapper = 'wrapper',
  mess = 'message',
  image = 'image',
  burger = `hamburger`,
  line = `line`,
  desc = 'description',
  article = 'article',
  person = 'person',
  account = 'account',
}

export enum Mode {
  email = 'email',
  pass = 'password',
  eye_closed = 'eye-closed',
  eye_opened = 'eye-opened',
  sign = 'sign',
  sign_out = 'sign-out',
  create = 'create',
  valid = 'valid',
  invalid = 'invalid',
  first = 'first',
  last = 'last',
  big = 'big',
  small = 'small',
  f_name = 'first-name',
  l_name = 'last-name',
  date = 'date-of-birth',
  street = 'street',
  city = 'city',
  postal = 'postal-code',
  country = 'country',
  street_bill = 'street-bill',
  city_bill = 'city-bill',
  postal_bill = 'postal-code-bill',
  country_bill = 'country-bill',
  response = 'response',
  contact = 'contact',
  ship = 'shipping',
  bill = 'billing',
  check_bill = 'check-bill',
  check = 'check',
  default = 'default',
  both = 'both-address',
  hidden = 'hidden',
  login = 'login',
  reg = 'registration',
  prof = 'profile',
  catalog = 'catalog',
  cross = 'cross',
  opened = 'opened',
  not = 'not',
}

export enum Base {
  form = 'form',
  subform = `${form} ${form}__subform`,
  field = `${form}__field`,
  check = `${form}__check`,
  form_section = `${form}__section`,
  inputs = `${form}__input`,
  labels = `${form}__label`,
  titles = `titles`,
  form_title = `${form}__${titles}`,
  btns = 'buttons',
  errs = 'errors',
  btns_colored = `${btns} ${btns}_colored`,
  btns_bordered = `${btns} ${btns}_bordered`,
  btns_empty = `${btns} ${btns}_empty`,
  select = `${form}__select`,
  options = `${form}__options`,
  links = `links`,
  burger = `hamburger`,
  img = 'image',
}

export enum Buttons {
  SIGN = 'SIGN IN',
  SIGN_OUT = 'SIGN OUT',
  CREATE = 'CREATE AN ACCOUNT',
  GO_HOME = 'GO TO MAIN PAGE',
  CATALOG = 'CATALOG',
  PROFILE = 'MY PROFILE',
  BURGER = 'burger',
}

export enum Titles {
  MAIN = 'Main',
  LOGIN = 'Login',
  REGISTRATION = 'Registration',
  PAGE_NOT_FOUND = 'Page not found',
  FORM_CONTACT = 'Contact Information',
  SHIPPING = 'Shipping',
  BILLING = 'Billing',
  BOTH_ADDRESS = `${SHIPPING} and ${BILLING}`,
  ADDRESS = 'Address',
  CHECK_BOTH = `${BOTH_ADDRESS} are the same`,
  DEFAULT_SHIP = `set ${SHIPPING} address as default`,
  DEFAULT_BILL = `set ${BILLING} address as default`,
  CREATE_ACCOUNT = `Create New Customer Account`,
  LOGIN_ACCOUNT = `Login Your Account`,
  HAVE_ACCOUNT = `Already have an account?`,
  NOT_HAVE_ACCOUNT = `Don't have an account yet?`,
  SUCCESS_LOGIN = `You've successfully logged`,
  CATALOG = `Shopping Without Limits`,
  ACCOUNT_INFO = `Account Information`,
  CONTACT_INFO = `Contact Information`,
  ADDRESS_BOOK = `Address Book`,
  PRODUCT = `Product`,
  HAVE_NOT = `You have not set a`,
}

export type HLevels = 1 | 2 | 3 | 4 | 5 | 6;
