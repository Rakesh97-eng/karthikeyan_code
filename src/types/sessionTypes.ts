export type LoginPayload = {
  query: string;
  variables: { input: LoginPayloadVariables };
};
export type LoginPayloadVariables = {
  email: string;
  password: string;
};
export type LoginPayloadResponse = {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string;
      expiresAt: string;
    };
  };
};

export type LoginSessionPayloadResponse = {
  token: string;
};

export type ForgetPayloadResponse = {
  customerRecover: {
    customerUserErrors: [ForgetErrorResponse];
  };
};

type accessToken = {
  accessToken: string;
};

export type ResetPayloadResponse = {
  customerReset: {
    customerAccessToken: accessToken | null;
    customerUserErrors: [ForgetErrorResponse];
  };
};

export type ForgetErrorResponse = {
  message: string;
};
export type SignUpPayloadResponse = {
  customerCreate: {
    customer: {
      id: string;
    };
  };
};

export type UpdatePhoneNumberResponse = {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    updated_at: string;
    created_at: string;
    zip_code: number;
    profile_image_url: string;
    is_member: boolean;
    membership_start_on: string;
    tags: [string];
  };
};

export type SignupPayload = {
  query: string;
  variables: { input: SignUpVariable };
};

export type ForgetPayload = {
  query: string;
  variables: verifyEmailPayload;
};
export type ResetPayload = {
  query: string;
  variables: ResetPasswordPayload;
};
export interface SignUpVariable {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdatePhoneNumberVariable {
  first_name: string;
  last_name: string;
  phone: string;
  zip_code?: string;
}

export type verifyEmailPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  id: string;
  input: {
    password: string;
    resetToken: string;
  };
};

export type verifyEmailResponse = {
  exists: {
    shopify: boolean;
  };
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    shopify_status?: string;
  };
};

export interface State {
  password: string;
  showPassword: boolean;
  confirmPassword: string;
  showConfirmPassword: boolean;
  emailId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginSignupState {
  password: string;
  showPassword: boolean;
  phoneNumber: string;
  emailId: string;
  firstName: string;
  lastName: string;
}

export interface EmailValidate {
  email: boolean;
  emailError: string;
}

export interface FieldValidate {
  emailId: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}
export interface LoginSignupFieldValidate {
  emailId: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

export type BoulevardAuthTokenResponse = {
  token: string;
  is_boulevard_client: string;
  business_id: string;
};
export interface UpdatePhoneNumberVariable {
  first_name: string;
  last_name: string;
  phone: string;
  zip_code?: string;
}
