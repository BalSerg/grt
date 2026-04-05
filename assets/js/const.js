const countryCodesJson = require('../../static/nimages/country-flags-svg/countries.json');

export const NOT_FOUND = 404;

export const CountryCode = countryCodesJson;

export const Header = {
  AUTHORIZED: 'x-authorized',
  LANG: 'x-lang',
  CURRENCY: 'x-currency',
  FOREIGNER: 'x-fner'
};

export const CookieName = {
  LANGUAGE: 'lang',
  CURRENCY: 'currency_code',
  COOKIE_ACCEPT: 'cookie_accept'
};

export const RFQ_type = {
  MAIN_PAGE_PRODUCT_CARD: 11,
  POLET: 12
};

export const PasswordRequirements = {
  MIN_LENGTH: 8,
  REGEXP: /[a-zA-Z]+/,
  HAS_FIGURES_REGEXP: /[0-9]/
};

export const EXTERNAL_LINK_REGEXP = new RegExp(
  '^/(ru|en|de|fr|es|it|pt|tr|zh|hi|vi)?[/]?(_nuxt.*|nimages.*|nfonts.*|js/old.*|restore-password|palekh-watch|catalog|catalog.*)?[/]?$',
  'g'
);

export const CURRENCY_RUB = 'RUB';

export const Currency = {
  AMD: 'AMD',
  AUD: 'AUD',
  AZN: 'AZN',
  BGN: 'BGN',
  BRL: 'BRL',
  BYN: 'BYN',
  CAD: 'CAD',
  CHF: 'CHF',
  CNY: 'CNY',
  CZK: 'CZK',
  DKK: 'DKK',
  EUR: 'EUR',
  GBP: 'GBP',
  HKD: 'HKD',
  HUF: 'HUF',
  INR: 'INR',
  JPY: 'JPY',
  KGS: 'KGS',
  KRW: 'KRW',
  KZT: 'KZT',
  MDL: 'MDL',
  NOK: 'NOK',
  PLN: 'PLN',
  RON: 'RON',
  RUB: '₽',
  SEK: 'SEK',
  SGD: 'SGD',
  TJS: 'TJS',
  TMT: 'TMT',
  TRY: 'TRY',
  UAH: 'UAH',
  USD: 'USD',
  UZS: 'UZS',
  ZAR: 'ZAR'
};

export const CurrencyFull = {
  AMD: '֏',
  AUD: 'AU$',
  AZN: '₼',
  BGN: 'лв',
  BRL: 'R$',
  BYN: 'Br',
  CAD: '$',
  CHF: '₣',
  CNY: '￥',
  CZK: 'Kč',
  DKK: 'kr',
  EUR: '€',
  GBP: '£',
  HKD: 'HK$',
  HUF: 'Ft',
  INR: '₨',
  JPY: '¥',
  KGS: '⊆',
  KRW: '₩',
  KZT: '₸',
  MDL: 'MDL',
  NOK: 'kr',
  PLN: 'zł',
  RON: 'lei',
  RUB: '₽',
  SEK: 'kr',
  SGD: 'S$',
  TJS: 'смн.',
  TMT: 'TMT',
  TRY: '₺',
  UAH: '₴',
  USD: '$',
  UZS: 'сўм',
  ZAR: 'R'
};

export const PhoneCountryCode = {
  61: 1,
  43: 2,
  994: 3,
  355: 5,
  213: 6,
  1340: 7,
  684: 8,
  1264: 9,
  244: 10,
  376: 11,
  672: 12,
  1268: 13,
  54: 14,
  374: 15,
  297: 16,
  93: 17,
  1242: 18,
  880: 19,
  1246: 20,
  973: 21,
  501: 22,
  375: 23,
  32: 24,
  229: 25,
  1441: 26,
  359: 27,
  591: 28,
  5997: 29,
  387: 30,
  267: 31,
  55: 32,
  246: 33,
  1284: 34,
  673: 35,
  226: 36,
  257: 37,
  975: 38,
  678: 39,
  379: 40,
  44: 41,
  36: 42,
  58: 43,
  670: 45,
  84: 46,
  241: 47,
  509: 48,
  592: 49,
  220: 50,
  233: 51,
  590: 52,
  502: 53,
  594: 54,
  224: 55,
  245: 56,
  49: 57,
  350: 59,
  504: 60,
  852: 61,
  1473: 62,
  299: 63,
  30: 64,
  995: 65,
  671: 66,
  45: 67,
  253: 69,
  1767: 70,
  1809: 71,
  243: 72,
  20: 73,
  260: 74,
  212: 75,
  // 212: 130,
  263: 76,
  972: 77,
  91: 78,
  62: 79,
  962: 80,
  964: 81,
  98: 82,
  353: 83,
  354: 84,
  34: 85,
  39: 86,
  967: 87,
  238: 88,
  7: 89,
  1345: 90,
  855: 91,
  237: 92,
  1: 93,
  974: 94,
  254: 95,
  357: 96,
  996: 97,
  686: 98,
  886: 99,
  850: 100,
  86: 101,
  // 672: 102,
  57: 103,
  269: 104,
  506: 105,
  53: 107,
  965: 108,
  856: 110,
  371: 111,
  266: 112,
  231: 113,
  961: 114,
  21: 115,
  370: 116,
  423: 117,
  352: 118,
  230: 119,
  222: 120,
  261: 121,
  853: 123,
  389: 124,
  265: 125,
  60: 126,
  223: 127,
  960: 128,
  356: 129,
  596: 131,
  692: 132,
  52: 133,
  691: 134,
  258: 135,
  373: 136,
  377: 137,
  976: 138,
  1664: 139,
  95: 140,
  264: 141,
  674: 142,
  977: 143,
  227: 144,
  234: 145,
  31: 146,
  505: 147,
  64: 149,
  687: 150,
  47: 151,
  968: 153,
  92: 161,
  680: 162,
  970: 163,
  507: 164,
  675: 165,
  595: 166,
  51: 167,
  48: 168,
  351: 169,
  1787: 170,
  242: 171,
  82: 172,
  262: 173,
  // 7: 174,
  250: 175,
  40: 176,
  503: 177,
  685: 178,
  378: 179,
  966: 181,
  268: 182,
  // 670: 183,
  248: 184,
  221: 188,
  1784: 189,
  1869: 190,
  1758: 191,
  381: 192,
  65: 193,
  1721: 194,
  963: 195,
  421: 196,
  386: 197,
  677: 198,
  252: 199,
  249: 200,
  597: 201,
  // 1: 202,
  232: 203,
  992: 204,
  66: 205,
  255: 206,
  690: 209,
  676: 210,
  1868: 211,
  688: 212,
  216: 213,
  993: 214,
  90: 215,
  256: 216,
  998: 217,
  380: 218,
  598: 220,
  298: 221,
  679: 222,
  63: 223,
  358: 224,
  33: 226,
  689: 227,
  385: 230,
  236: 231,
  235: 232,
  382: 233,
  420: 234,
  56: 235,
  41: 236,
  46: 237,
  // 1: 238,
  94: 239,
  593: 240,
  240: 241,
  291: 242,
  372: 243,
  251: 244,
  27: 245,
  500: 225,
  211: 247,
  1876: 248,
  81: 249,
  9971: 251,
  840: 252,
  228: 208,
  383: 250
};

export const ScreenSize = {
  DESKTOP: 1024,
  TABLET: 768,
  MOBILE: 320,
  SCROLL: 16
};

export const CatalogFilterQuery = {
  RANGE: 'range',
  FILTERS: 'filters',
  PAGE: 'page',
  SORT: 'sort'
};

export const AllowedQuery = {
  RANGE: 'range',
  FILTERS: 'filters',
  PAGE: 'page',
  SORT: 'sort',
  AREA: 'area',
};

export const FilterType = {
  CHECKBOX: 'checkbox',
  RANGE: 'range',
  SWITCH: 'switch',
  RADIO: 'radio'
};

export const SortOption = {
  DEFAULT: 'default',
  NEW: 'new',
  PRICE_ASC: 'priceasc',
  PRICE_DESC: 'pricedesc'
};

export const DefaultSemanticId = {
  PRODUCTS: 'products',
  SERVICES: 'services',
  PROMO: 'promo',
  SUPPLIERS: 'suppliers'
};

export const REDIRECT_CODE = 301;
export const GONE_CODE = 410;

export const BasePath = {
  CATALOG: '/catalog',
  PRODUCTS: '/products',
  PROMO: '/promo',
  SUPPLIERS: '/suppliers',
  FAVORITES: '/favorites'
};

export const schema = {
  CATALOG: 'catalog',
  PROMO: 'promo',
  SEARCH: 'search',
  SUPPLIERS: 'suppliers',
  FAVORITES: 'favorites'
}

export const ONE_YEAR_IN_MS = 31536000000;

export const CATALOG_SEARCH_BASE_URL = '/napi/catalog-search/categories';

export const PROMO_SEARCH_BASE_URL = '/napi/catalog-search/promo-pages';

export const SUPPLIERS_SEARCH_BASE_URL = '/napi/catalog-search/suppliers';

export const SEARCH_BASE_URL = '/napi/catalog-search/search';

export const FAVORITES_BASE_URL = '/napi/catalog-search/favorites';

export const PROMO_CATEGORIES_DESCRIPTION_URL = '/napi/promo/CategoryDescriptions';

export const SANITIZER_DEFAULT_CONFIG = {
  allowedTags: [
    'h3', 'h4', 'h5', 'h6', 'hgroup', 'blockquote', 'dd', 'div',
    'dl', 'dt', 'hr', 'li',  'ol', 'p', 'ul',  'b', 'br', 'cite',
    'em', 'i', 'mark', 'q', 's', 'small', 'span', 'strong', 'tr',
    'sup', 'caption', 'col', 'colgroup', 'table', 'tbody', 'td',
    'tfoot', 'th', 'thead', 'sub',
  ],
  selfClosing: [
    'br', 'hr'
  ],
};

export const USER_MUTATIONS = [
  'userData/addGoodsItemToUserFavorites',
  'userData/removeGoodsItemFromUserFavorites',
  'userData/removeUser',
  'userData/setUser',
];

export const MULTIPART_FORM_DATA_HEADER = {
  'Content-Type': 'multipart/form-data',
};

export const SEARCH_PAGE_NAME = 'search';

export const DefaultImage = {
  NO_PRODUCT_PHOTO: '/nimages/no_picture.png',
  NO_COMPANY_LOGO: '/nimages/no-logo.png'
};

// добавить L когда понадобиться размер между 600 и 2420
export const CdnImageSize = {
  XS: 210,
  S: 320,
  M: 600,
  XL: 2420
};

export const EnvMode = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};

// Типы страничных документов:
// 1: FAQ для покупателей;
// 2: Докменты;
// 3: FAQ для поставщиков;
// TODO - Переделать на semanticId
export const SectionsTypeIds = {
  FAQ: 1,
  DOC: 2,
  FAQ_SUPPLIERS: 3
};

export const MediaType = {
  PHOTO: 'photo',
  VIDEO: 'video'
};

export const PublishModes = {
  AVAILABLE: 'Available',
  TEMPORARILY_OUT_OF_STOCK: 'TemporarilyOutOfStock',
  DISCONTINUED: 'Discontinued',
  NOT_PUBLISHED: 'NotPublished',
};


