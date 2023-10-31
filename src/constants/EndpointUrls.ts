export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_API_URL || '';
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.REACT_APP_X_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
export const VERIFY_EMAIL_URL =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}account/verify-email` ||
  '';
export const ACCOUNT_URL =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}account/contact-information` ||
  '';
export const AUTH_SESSION_URL =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}auth/session` || '';
export const AUTH_TOKEN_URL =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}auth/token` || '';
export const SHOPIFY_GRAPHQL_URL =
  process.env.REACT_APP_X_SHOPIFY_GRAPHQL_URL || '';
export const PAYMENT_TOKENIZE_API =
  process.env.REACT_APP_PAYMENT_TOKENIZE_API || '';
export const PAYMENT_METHOD_API =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}account/payment-methods` ||
  '';
export const CLIENT_INFO_API =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}account` || '';
export const BOOKED_APPOINTMENT =
  `${process.env.REACT_APP_X_SHOPIFY_MIDDLEWARE_API_BASEURL}account/appointments` ||
  '';
export const INTAKE_PATCH_ACCOUNT =
  `${process.env.REACT_APP_MIDDLEWARE_URL}/api/v1/account/intake` || '';
export const INTAKE_ACCOUNT_RESET =
  `${process.env.REACT_APP_MIDDLEWARE_URL}account/reset` || '';
