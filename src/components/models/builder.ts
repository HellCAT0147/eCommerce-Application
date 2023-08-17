export enum Blocks {
  main = 'main',
  header = 'header',
  footer = 'footer',
  login = 'login',
  reg = 'registration',
  form = `form`,
  not_found = `not-found`,
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
  response = 'response',
}

export enum Base {
  form = 'form',
  field = `${form}__field`,
  inputs = `${form}__input`,
  labels = `${form}__label`,
  titles = `titles`,
  btns = 'buttons',
  errs = 'errors',
  btns_colored = `${btns} ${btns}_colored`,
  btns_bordered = `${btns} ${btns}_bordered`,
  btns_empty = `${btns} ${btns}_empty`,
}

export enum Buttons {
  SIGN = 'SIGN IN',
  SIGN_OUT = 'SIGN OUT',
  CREATE = 'CREATE AN ACCOUNT',
  go_home = 'GO TO MAIN PAGE',
}

export enum Titles {
  MAIN = 'Main',
  LOGIN = 'Login',
  REGISTRATION = 'Registration',
  PAGE_NOT_FOUND = 'Page not found',
}
