export const HOST = 'http://localhost';
export const VERSION = '/v1';
//export const API_PORT = process.env.TZ || 3000;
export const API_PORT = 3000;
export const API_PREFIX = '/api';

// Auth
export const AUTH_SIGNUP = '/auth/signup';
export const AUTH_SIGNIN = '/auth/signin';
export const VALIDATED_USER = '/validate-user';
export const REFRESH_TOKENS = '/refresh-tokens'
export const SIGNUP_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + AUTH_SIGNUP;
export const SIGNIN_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + AUTH_SIGNIN;
export const VALIDATED_USER_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + VALIDATED_USER;
export const REFRESH_TOKENS_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + REFRESH_TOKENS;

// Mailer
export const VERIFY_EMAIL = '/auth/verify-email';
export const EMAIL_VERIFIED = '/auth/email-verified';
export const EMAIL_VERIFIED_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + EMAIL_VERIFIED;
export const VERIFY_EMAIL_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + VERIFY_EMAIL;
// Product
export const PRODUCTS = '/products';
export const PRODUCT = '/product/:id';
export const PRODUCTS_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + PRODUCTS;
export const PRODUCT_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + PRODUCT;
// Product Categories
export const CATEGORIES = '/categories';
export const CATEGORY_TREE = '/category-tree';
export const CATEGORIES_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + CATEGORIES;
export const CATEGORY_TREE_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + CATEGORY_TREE;
