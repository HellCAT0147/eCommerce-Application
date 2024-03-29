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
  modal = 'modal',
  ctrl = 'controls',
  cart = 'cart',
  order = 'order',
  promo = 'promo',
  popup = 'popup',
  about = 'about',
  person = 'person',
  content = 'content',
  facts = 'facts',
  contacts = 'contacts',
  bio = 'bio',
  impact = 'impact',
  teamwork = 'teamwork',
  rss = 'rss',
  thanks = 'thanks',
  brands = 'brands',
  colors = 'colors',
  size = 'size',
  contact = 'contact',
}

export enum Elem {
  btn = 'button',
  btn_cart = 'button-cart',
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
  addresses = 'addresses',
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
  modal = 'modal',
  content = 'content',
  contents = 'contents',
  close = 'close',
  price = 'price',
  subtitle = 'subtitle',
  pass = 'password',
  cart = 'cart',
  bag = 'bag',
  shopping = 'shopping',
  quantity = 'quantity',
  list = 'list',
  header = 'header',
  product = 'product',
  total = 'total',
  item = 'item',
  aside = 'aside',
  promo = 'promo',
  order = 'order',
  amount = 'amount',
  control = 'control',
  edit = 'edit',
  name = 'name',
  container = 'container',
  popup = 'popup',
  info = 'info',
  role = 'role',
  git = 'git',
  more = 'more',
  facts = 'facts',
  fact = 'fact',
  contact = 'contact',
  contacts = 'contacts',
  bio = 'bio',
  impact = 'impact',
  teamwork = 'teamwork',
  rss = 'rss',
  locale = 'locale',
  thanks = 'thanks',
  brands = 'brands',
  brand = 'brand',
  color = 'color',
  colors = 'colors',
  sizes = 'sizes',
  size = 'size',
  loader = 'loader',
  rights = 'rights',
  base = 'base',
  menu = 'menu',
  design = 'design',
  photos = 'photos',
  right = 'right',
}

export enum Mode {
  email = 'email',
  pass = 'password',
  pass_new = 'password-new',
  eye_closed = 'eye-closed',
  eye_opened = 'eye-opened',
  sign = 'sign',
  sign_out = 'sign-out',
  create = 'create',
  valid = 'valid',
  invalid = 'invalid',
  first = 'first',
  second = 'second',
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
  body = 'body',
  click = 'clickable',
  info = 'info',
  price = 'price',
  disc = 'discounted',
  account = 'account',
  address = 'address',
  save = 'save',
  control = 'control',
  back = 'back',
  edit = 'edit',
  over = 'overflow',
  update = 'update',
  new = 'new',
  fail = 'failed',
  del = 'delete',
  add = 'add',
  bill_def = 'billing-default',
  ship_def = 'shipping-default',
  about = 'about-us',
  main = 'main',
  static = 'static',
  cart = 'cart',
  link = 'link',
  colored = 'colored',
  promo = 'promo',
  subtotal = 'subtotal',
  tax = 'tax',
  sale = 'sale',
  total = 'total',
  order = 'order',
  clear = 'clear',
  dec = 'decrease',
  inc = 'increase',
  item = 'item',
  available = 'available',
  get_promo = 'get-promo',
  get_banner = 'get-banner',
  left = 'left',
  right = 'right',
  dis = 'disabled',
  base = 'base',
  remove = 'remove',
  popup = 'popup',
  yes = 'yes',
  no = 'no',
  overlay = 'overlay',
  person = 'person',
  pr = 'pull-requests',
  comm = 'commits',
  lines = 'lines',
  branches = 'branches',
  git = 'git',
  top = 'top',
  bottom = 'bottom',
  rss = 'rss',
  banner = 'banner',
  select = 'select',
  title = 'title',
  subtitle = 'subtitle',
  text = 'text',
  color = 'color',
  size = 'size',
  wrapper = 'wrapper',
  medium = 'medium',
  large = 'large',
  design = 'design',
  photos = 'photos',
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
  btns_edit = `${btns} ${btns}_edit`,
  btns_quant = `${btns} ${btns}__quantity`,
  btns_modal = `${btns}_modal`,
  btns_redirect = `redirect__buttons`,
  select = `${form}__select`,
  options = `${form}__options`,
  links = `links`,
  burger = `hamburger`,
  img = 'image',
  swiper = 'swiper',
  sw_wrap = 'swiper-wrapper',
  sw_slide = 'swiper-slide',
  sw_next = 'swiper-button-next',
  sw_prev = 'swiper-button-prev',
  sw_page = 'swiper-pagination',
  cards = 'cards',
  modal = 'modal',
  prof_f = 'profile__forms',
  current_page = 'current-page',
  promo = 'promo',
  person = 'person',
  mentor = 'person person_mentor',
  content = 'content',
  teamwork = 'teamwork',
  rss = 'rss',
  brands = 'brands',
}

export enum Buttons {
  HOME = 'HOME',
  SIGN = 'SIGN IN',
  SIGN_OUT = 'SIGN OUT',
  CREATE = 'CREATE AN ACCOUNT',
  GO_HOME = 'GO TO MAIN PAGE',
  CATALOG = 'CATALOG',
  PROFILE = 'MY PROFILE',
  ABOUT_US = 'ABOUT US',
  BURGER = 'burger',
  EDIT = 'Edit',
  EDIT_ADDRESS = 'Edit Address',
  DEL_ADDRESS = 'Delete Address',
  ADD_ADDRESS = 'Add Address',
  SAVE = 'SAVE',
  BACK = 'BACK',
  CHANGE_PASS = 'Change Password',
  CLEAR_CART = 'CLEAR SHOPPING CART',
  PROMO = 'APPLY DISCOUNT',
  ORDER = 'PROCEED TO CHECKOUT',
  GET_PROMO = 'GET PROMO CODE',
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
  SUCCESS_UPDATE = `You've successfully update the information`,
  FAILED_UPDATE = `You failed to update the information.`,
  CATALOG = `Shopping Without Limits`,
  ACCOUNT_INFO = `Account Information`,
  CONTACT_INFO = `Contact Information`,
  ADDRESS_BOOK = `Address Book`,
  PRODUCT = `Product`,
  HAVE_NOT = `You have not set a`,
  UPDATE = `Update`,
  PASSWORD = `Password`,
  ADD = `Add`,
  ABOUT_US = `About Us`,
  SHOP_CART = `Shopping Cart`,
  PCS = `pcs`,
  CURRENCY = `RUB`,
  PROMO = `Apply Discount Code`,
  INPUT_PROMO = `Enter discount code`,
  SUBTOTAL = `Subtotal`,
  TAX = `Tax`,
  SALE = `Sale`,
  ORDER = `Order Total`,
  EMPTY_CART = `There are no products in your cart yet.`,
  GO_CATALOG = `For a selection of products please go to the`,
  PROMO_FIRST = `AUTUMN SALE GET `,
  BANNER_FIRST = `ULTIMATE SALE GET `,
  PROMO_SECOND = `30% OFF `,
  BANNER_SECOND = `40% OFF `,
  PROMO_LAST = `ON EVERYTHING.`,
  BANNER_LAST = `ON ALL WHITE.`,
  PROMO_CODE = `RASDAPROJA`,
  BANNER_CODE = `WHITESALE40`,
  PROMO_SUCCESSES = `Promo code successfully applied.`,
  FAILED_UPDATE_CART = `You failed to update the cart.`,
  CART_CLEAR = `Your cart has been successfully cleared.`,
  FAILED_UPDATE_CATALOG = `You failed to update the catalog.`,
  HAQ_TITLE = `HAQ TEAM`,
  HAQ_SUBTITLE = `A trio of outstanding frontend experts united by their unusual approach to web development.`,
  FACTS = 'PROJECT FACTS',
  FACTS_PR = 'Pull Requests ',
  PR_AMOUNT = '65',
  FACTS_COMM = 'Commits ',
  COMM_AMOUNT = '450',
  FACTS_LINES = 'Lines of Code ',
  LINES_AMOUNT = '~30k',
  FACTS_BRANCHES = 'Branches ',
  BRANCHES_AMOUNT = '62',
  BIO_TITLE = 'About:',
  IMPACT_TITLE = 'Contributions:',
  TEAM_TITLE = 'Collaboration',
  TEAM_TEXT = 'The developers of our team met here at the RSS course. Kamilla and Ilya first met while discussing the GIT test in the thematic Discord channel, and later, while working on the OOP test and developing the Minesweeper, they met Alexander. Ilya and Alexander immediately agreed on code cleanliness and neatness of development, while Kamilla took a supporting role and search for quick solutions. The team stayed in touch almost around the clock, immediately responding to problems arising during development. Every idea and subsequent solution was discussed with the entire team beforehand, and no pull-request was merged without the approval of the entire team. During the development HAQ faced various difficulties, which were mainly due to the inexperience of the team members. Mentors Aleksei and Andrei  were immediately coming to the rescue, who, with their impressive experience in IT, could tell us exactly in which direction to look for a solution to a problem that arose. During the development of the project, the team members became friends and hope to continue their cooperation, or at least maintain contact, in the future.',
  RSS_TITLE = '& RS School',
  THANKS_TITLE = 'Special Thanks',
  THANKS_TEXT = `Our mentors played a far from insignificant role in the creation of this app. Andrei is a master of his craft, a virtuoso of the front-end, friendly and attentive to detail. Throughout the whole mentorship, he tried to keep abreast of his mentee's affairs, his interviews; when contacting him, he always tried to get in touch as soon as possible and help to solve the issue. Alexey is a fullstack developer, a GitHub sorcerer, capable of destroying your code problems and your self-esteem with one breath. These awesome guys guided our young inexperienced team through the thorns to stardom. Thank you!!`,
  MENU = 'MENU',
  BRAND_CHOOSE = 'chose your brand',
  FASHION = 'FASHION CATALOG',
  BRAND_CHANEL = 'CHANEL',
  BRAND_BURBERRY = 'BURBERRY',
  BRAND_RS = 'RS-FASHION',
  BRAND_BOLD = 'BOLD ITALICS',
  BRAND_FENDI = 'FENDI',
  BRAND_DIOR = 'DIOR',
  BRAND_VERSACE = 'VERSACE',
  BRAND_GUCCI = 'GUCCI',
  BRAND_ARMANI = 'ARMANI',
  BRAND_HAQ = 'HAQ-INC',
  DESC_TITLE = 'Details',
  DESC_SUBTITLE = 'ABOUT PRODUCT',
  COLOR = 'Color',
  PRICE_TOTAL = 'Price Total',
  SIZES = 'Select size (Inches)',
  SEARCH = 'Searh',
  BRAND = 'Brand',
  SIZE = 'Size (Inches)',
  PRICE_RANGE = 'Price Range',
  CONTACTS = 'CONTACT US',
  ADDRESS_COMPANY = '221B Baker Street, London',
  PHONE_COMPANY = '(020) 6969 3690',
  EMAIL_COMPANY = 'haq-inc@shop.com',
  WORK_COMPANY = 'MON - SUN / 9:00AM - 8:00PM',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  WORK = 'WORK',
  RIGHTS_DESIGN = '© 2019. Crisp theme Developed by Belvg',
  RIGHTS_PHOTOS = 'Shop Lovely Style',
  RIGHTS_TEAM = 'HAQ © 2023',
}

export type HLevels = 1 | 2 | 3 | 4 | 5 | 6;
