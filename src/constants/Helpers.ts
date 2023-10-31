export const BOULEVARD_AUTH_API_TOKEN = 'boulevard_auth_api_token';
export const CUSTOMER_SESSION_TOKEN = 'customer_session_token';
export const NO_TOKEN_FOUND = 'No Token Found';
export const CUSTOMER_ACCESS_TOKEN = 'customer_access_token';
export const IS_BOULEVARD_CLIENT = 'is_boulevard_client';
export const PROGRESS = 'progress';
export const BACK_PROGRESS = 'back_progress';
export const USER_INFO = 'user_info';
export const APP_DOWNLOAD_LINK =
  'https://apps.apple.com/us/app/heyday-a-facial-shop/id992014636';

export const MEMBERSHIP_ROUTE = '/membership-agreement';
export const MEMBERSHIP_WELCOME_ROUTE = `${MEMBERSHIP_ROUTE}/welcome`;
export const MEMBERSHIP_LOGIN_ROUTE = `${MEMBERSHIP_ROUTE}/login`;
export const MEMBERSHIP_SIGN_UP_ROUTE = `${MEMBERSHIP_ROUTE}/signup`;
export const MEMBERSHIP_FORGOT_ROUTE = `${MEMBERSHIP_ROUTE}/forgot`;
export const MEMBERSHIP_FORGOT_SUCCESS_ROUTE = `${MEMBERSHIP_ROUTE}/forgot-success`;
export const MEMBERSHIP_SUCCESS_ROUTE = `${MEMBERSHIP_ROUTE}/success`;
export const BRENTWOOD = 'brentwood';
export const GIFT_CARDS = 'gift cards';

export const SIGNUP_MESSAGES = {
  INVALID_EMAIL: 'Email address is not valid',
  REQUIRED: 'This Field is Required',
  PASSWORD_INVALID: 'Password must be 5 characters',
  PASSWORD_NOT_MATCH: 'Password does not match',
  EMAIL_EXISTS:
    'The email entered is associated with an existing Heyday account',
  SIGNUP_SUCCESS: 'Account created successfully',
  SIGNUP_FAILED: 'Invalid email address',
  INVALID_NAME: 'Enter valid name',
  SHOPIFY_STATUS_SIGNUP:
    '👋 Hey, it looks like we already have your email in our system. We just sent you an email to finish setting up your account. ',
  SHOPIFY_STATUS_LOGIN:
    '👋 It’s great to see you again! It looks like you need to finish setting up your account before logging in. Check your email for next steps.',
  PHONE_NUMBER_REQUIRED: 'This Field is Required',
  PHONE_NUMBER_INVALID: 'Phone Number is not valid',
};

export const FORGET_MESSAGES = {
  LIMIT_EXCEEDED: 'Request Limit Exceeded',
  SUCCESS: 'E-Mail Send Successfully',
  ENTER_VALID_EMAIL: 'Enter valid email address',
};

export const SHOPIFY_STATUS = {
  ENABLED: 'enabled',
  INVITED: 'invited',
};
export const REMOVE_LOCATION_LIST = [BRENTWOOD, GIFT_CARDS];
