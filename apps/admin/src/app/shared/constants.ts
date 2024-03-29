export const HOST = 'http://localhost';
export const VERSION = '/v1';
//export const API_PORT = process.env['API_PORT'] || 3000;
export const API_PORT = 3000;
export const API_PREFIX = '/api';

// Auth
export const AUTH_SIGNUP = '/auth/signup';
export const AUTH_SIGNIN = '/auth/signin';
export const SIGNUP_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + AUTH_SIGNUP;
export const SIGNIN_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + AUTH_SIGNIN;

// Mailer
export const VERIFY_EMAIL = '/auth/verify-email';
export const EMAIL_VERIFIED = '/auth/email-verified';
export const EMAIL_VERIFIED_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + EMAIL_VERIFIED;
export const VERIFY_EMAIL_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + VERIFY_EMAIL;