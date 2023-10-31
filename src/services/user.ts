// valid for authentication
import {
  ForgetPayload,
  ForgetPayloadResponse,
  LoginPayloadVariables,
  LoginSessionPayloadResponse,
  ResetPasswordPayload,
  ResetPayload,
  ResetPayloadResponse,
  SignupPayload,
  SignUpPayloadResponse,
  SignUpVariable,
  UpdatePhoneNumberVariable,
  verifyEmailPayload,
  verifyEmailResponse,
} from '../types/sessionTypes';
import {
  AUTH_SESSION_URL,
  SHOPIFY_GRAPHQL_URL,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  VERIFY_EMAIL_URL,
  CLIENT_INFO_API,
  ACCOUNT_URL,
  INTAKE_PATCH_ACCOUNT,
} from '../constants/EndpointUrls';
import {
  emailVerifier,
  getLocalStorageItem,
  tokenValidator,
} from '../utils/helper-functions/user';
import { Axios } from './Axios';
import { AXIOS_METHODS } from '../constants/enums';
import { ClientInfoResponse } from '../types/userTypes';
import { CUSTOMER_SESSION_TOKEN } from '../constants/Helpers';
import {
  IntakeFormState,
  IntakeShopPatchPayloadObjType,
} from '../types/store/form';

/*
 * Mutations
 */

const createUserMutation = `mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }`;

const customerRecoverMutation = `mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }`;

const customerResetMutation = `mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customerAccessToken{
        accessToken
      }
      customerUserErrors {
        code
      }
    }
  }`;
/*
 * Api call
 */
export const emailVerification = async (email: string) => {
  const payload = {
    email,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  if (emailVerifier(email)) {
    const response = await Axios.setHeaders(headers).callApi<
      verifyEmailPayload,
      verifyEmailResponse
    >(AXIOS_METHODS.POST, VERIFY_EMAIL_URL, undefined, payload);
    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
};

export const signUpCreateUserApi = async (variables: SignUpVariable) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  };

  const payload: SignupPayload = {
    query: createUserMutation,
    variables: { input: variables },
  };
  const response = await Axios.setHeaders(headers).callApi<
    SignupPayload,
    SignUpPayloadResponse
  >(AXIOS_METHODS.POST, SHOPIFY_GRAPHQL_URL, undefined, payload);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const getUserAuthSessionApi = async (
  authToken: string,
  variables: LoginPayloadVariables
) => {
  const payload: LoginPayloadVariables = variables;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${authToken}`,
  };
  const response = await Axios.setHeaders(headers).callApi<
    LoginPayloadVariables,
    LoginSessionPayloadResponse
  >(AXIOS_METHODS.POST, AUTH_SESSION_URL, undefined, payload);
  if (response) {
    return response;
  } else {
    throw new Error(response);
  }
};

export const forgetPasswordApi = async (variables: verifyEmailPayload) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  };
  const payload: ForgetPayload = {
    query: customerRecoverMutation,
    variables,
  };
  const response = await Axios.setHeaders(headers).callApi<
    ForgetPayload,
    ForgetPayloadResponse
  >(AXIOS_METHODS.POST, SHOPIFY_GRAPHQL_URL, undefined, payload);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const getUserInfo = async () => {
  tokenValidator();
  const headers = {
    Authorization: `Bearer ${getLocalStorageItem(CUSTOMER_SESSION_TOKEN)}`,
  };
  const response = await Axios.setHeaders(headers).callApi<
    undefined,
    ClientInfoResponse
  >(AXIOS_METHODS.GET, CLIENT_INFO_API);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};
export const updatePhoneNumber = async (
  authToken: string,
  variables: UpdatePhoneNumberVariable
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getLocalStorageItem(CUSTOMER_SESSION_TOKEN)}`,
  };
  tokenValidator();
  const payload: UpdatePhoneNumberVariable = variables;
  const response = await Axios.setHeaders(headers).callApi<
    UpdatePhoneNumberVariable,
    ClientInfoResponse
  >(AXIOS_METHODS.PUT, ACCOUNT_URL, undefined, payload);

  return response.data;
};

type IntakeBatchPayloadType = {
  data: IntakeFormState[];
};
type IntakeBatchShopPayloadType = {
  data: IntakeShopPatchPayloadObjType[];
};
export const batchClientIntake = async (payload?: IntakeBatchPayloadType) => {
  const headers = {
    Authorization: `Bearer ${getLocalStorageItem(CUSTOMER_SESSION_TOKEN)}`,
  };
  const response = await Axios.setHeaders(headers).callApi<
    IntakeBatchPayloadType,
    undefined
  >(AXIOS_METHODS.PATCH, INTAKE_PATCH_ACCOUNT, undefined, payload);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const batchShopIntake = async (
  payload: IntakeBatchShopPayloadType,
  id: string | null,
  token?: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url = `${process.env.REACT_APP_MIDDLEWARE_URL}/admin/api/v1/customer/${id}/intake`;
  const response = await Axios.setHeaders(headers).callApi<
    IntakeBatchShopPayloadType,
    undefined
  >(AXIOS_METHODS.PATCH, url, undefined, payload);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const resetPasswordApi = async (variables: ResetPasswordPayload) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  };
  const payload: ResetPayload = {
    query: customerResetMutation,
    variables,
  };
  const response = await Axios.setHeaders(headers).callApi<
    ResetPayload,
    ResetPayloadResponse
  >(AXIOS_METHODS.POST, SHOPIFY_GRAPHQL_URL, undefined, payload);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};
