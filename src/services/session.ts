import {
  SHOPIFY_GRAPHQL_URL,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  AUTH_TOKEN_URL,
} from '../constants/EndpointUrls';
import { AXIOS_METHODS } from '../constants/enums';
import { Axios } from './Axios';
import {
  BoulevardAuthTokenResponse,
  LoginPayload,
  LoginPayloadResponse,
  LoginPayloadVariables,
} from '../types/sessionTypes';
import {
  getLocalStorageItem,
  tokenValidator,
} from '../utils/helper-functions/user';
import { CUSTOMER_SESSION_TOKEN } from '../constants/Helpers';

/*
 * Mutations
 */

const createAccessTokenMutation = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }`;

/*
 * Api call
 */

export const loginTokenCreateApi = async (variables: LoginPayloadVariables) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  };
  const payload: LoginPayload = {
    query: createAccessTokenMutation,
    variables: { input: variables },
  };
  const response = await Axios.setHeaders(headers).callApi<
    LoginPayload,
    LoginPayloadResponse
  >(AXIOS_METHODS.POST, SHOPIFY_GRAPHQL_URL, undefined, payload);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const getBoulevardAuthToken = async () => {
  const token = getLocalStorageItem(CUSTOMER_SESSION_TOKEN);
  tokenValidator();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Platform: 'boulevard',
  };
  const response = await Axios.setHeaders(headers).callApi<
    undefined,
    BoulevardAuthTokenResponse
  >(AXIOS_METHODS.GET, AUTH_TOKEN_URL, null);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};
