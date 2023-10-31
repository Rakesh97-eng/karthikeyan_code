import { useState, useContext } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import StyledButton from '../../common/Button';
import {
  IntakeContentWrapper,
  IntakeFooterWrapper,
  IntakeLoginContainer,
  IntakeWrapper,
  StyledFilledTextField,
} from '../intake.styles';
import { ToastContext } from '../../../providers/context/toastContext';
import BottomCurve from '../../../assets/icons/intake-bottom-curve.svg';
import { useHistory } from 'react-router-dom';
import StyledBackButton from '../styledBackButton';
import { userSignUpSchema } from '../../../utils/yup-schema/user';
import { ValidationError } from 'yup';
import { generateValidationErrorObject } from '../../../utils/helper-functions/yup';
import {
  emailVerification,
  getUserAuthSessionApi,
  getUserInfo,
  signUpCreateUserApi,
  updatePhoneNumber,
} from '../../../services/user';
import { ReactComponent as Eye } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../assets/icons/eye-slash.svg';
import {
  BOULEVARD_AUTH_API_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  IS_BOULEVARD_CLIENT,
  MEMBERSHIP_LOGIN_ROUTE,
  MEMBERSHIP_WELCOME_ROUTE,
  SHOPIFY_STATUS,
  SIGNUP_MESSAGES,
} from '../../../constants/Helpers';
import {
  containSpecialChar,
  numberOnly,
  textTrimmer,
} from '../../../utils/helper-functions/common';
import {
  emailVerifier,
  setLocalStorageItem,
} from '../../../utils/helper-functions/user';
import {
  CUSTOMER_SESSION_TOKEN,
  INTAKE_LOGIN_ROUTE,
  INTAKE_WELCOME_ROUTE,
  LOGIN_ERROR_MESSAGE,
} from '../../../constants/intakeConstants';
import { CustomerDetailsContext } from '../../../providers/context/IntakeClientContext';
import {
  getBoulevardAuthToken,
  loginTokenCreateApi,
} from '../../../services/session';
import { Base64 } from 'js-base64';
import { ClientInfoResponse } from '../../../types/userTypes';
import { TMembership } from '../../../types/commonTypes';
interface State {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

interface FieldValidate {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const SignUp = ({ isMembership }: TMembership) => {
  const history = useHistory();
  const { showToast } = useContext(ToastContext);
  const { updateData, updateState } = useContext(CustomerDetailsContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [values, setValues] = useState<State>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errors, setErrors] = useState<FieldValidate>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const backNavigate = () => {
    history.goBack();
  };

  let fieldValid = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  };
  let base64AccessToken = '';
  const handleClickShowPassword = (field: string) => {
    if (field === 'password') {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    } else if (field === 'confirmPassword') {
      setValues({
        ...values,
        showConfirmPassword: !values.showConfirmPassword,
      });
    }
  };
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === 'phoneNumber' && event.target.value) {
        fieldValid.phoneNumber = numberOnly(textTrimmer(event.target.value))
          ? ''
          : SIGNUP_MESSAGES.PHONE_NUMBER_INVALID;
        setErrors(fieldValid);
      }
      const newValues: State = {
        ...values,
        [prop]: textTrimmer(event.target.value),
      };
      if (prop === 'email' && event.target.value) {
        newValues.email = textTrimmer(event.target.value.toLowerCase());
      }
      setValues(newValues);

      if (
        newValues.email &&
        newValues.firstName &&
        newValues.lastName &&
        newValues.password &&
        newValues.confirmPassword &&
        newValues.phoneNumber
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

  const passwordValidator = () => {
    if (textTrimmer(values.password)) {
      fieldValid.password =
        values.password.length >= 5 ? '' : SIGNUP_MESSAGES.PASSWORD_INVALID;
    } else {
      fieldValid.password = SIGNUP_MESSAGES.REQUIRED;
    }

    if (values.confirmPassword) {
      if (values.confirmPassword.length >= 5) {
        fieldValid.confirmPassword =
          values.password === values.confirmPassword
            ? ''
            : SIGNUP_MESSAGES.PASSWORD_NOT_MATCH;
      } else {
        fieldValid.confirmPassword = SIGNUP_MESSAGES.PASSWORD_INVALID;
      }
    } else {
      fieldValid.confirmPassword = SIGNUP_MESSAGES.REQUIRED;
    }
  };

  const phoneNumberValidator = () => {
    if (textTrimmer(values.phoneNumber)) {
      fieldValid.phoneNumber = numberOnly(values.phoneNumber)
        ? ''
        : SIGNUP_MESSAGES.PHONE_NUMBER_INVALID;
    } else {
      fieldValid.phoneNumber = SIGNUP_MESSAGES.REQUIRED;
    }
  };

  const fieldValidate = () => {
    fieldValid = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    };
    passwordValidator();
    phoneNumberValidator();
    fieldValid.email = emailVerifier(values.email)
      ? ''
      : SIGNUP_MESSAGES.INVALID_EMAIL;

    if (textTrimmer(values.firstName)) {
      fieldValid.firstName = containSpecialChar(values.firstName)
        ? ''
        : SIGNUP_MESSAGES.INVALID_NAME;
    } else {
      fieldValid.firstName = SIGNUP_MESSAGES.REQUIRED;
    }

    if (textTrimmer(values.lastName)) {
      fieldValid.lastName = containSpecialChar(values.lastName)
        ? ''
        : SIGNUP_MESSAGES.INVALID_NAME;
    } else {
      fieldValid.lastName = SIGNUP_MESSAGES.REQUIRED;
    }

    setErrors(fieldValid);

    return Object.values(fieldValid).every((x) => x === '');
  };

  const verifyEmail = async () => {
    const res = await emailVerification(values.email);
    
    if (res?.exists?.shopify) {
      updateData({ email: values.email });
      setErrors((pre) => ({
        ...pre,
        email: SIGNUP_MESSAGES.EMAIL_EXISTS,
      }));
      if (res?.customer?.shopify_status === SHOPIFY_STATUS.ENABLED) {
        history.push(
          isMembership ? MEMBERSHIP_LOGIN_ROUTE : INTAKE_LOGIN_ROUTE
        );
      } else if (res?.customer?.shopify_status === SHOPIFY_STATUS.INVITED) {
        showToast({
          text: SIGNUP_MESSAGES.SHOPIFY_STATUS_SIGNUP,
          variant: 'error',
          isIcon: false,
        });
      }
    } else {
      setErrors((pre) => ({ ...pre, email: '' }));
      updateData({ email: '' });
    }
  };
  const validation = async () => {
    setLoading(true);
    if (fieldValidate()) {
      try {
        const generatedError = (await userSignUpSchema.validate(values))
          .confirmPassword;
        console.log(generatedError);
        await handleSubmit();
      } catch (error) {
        if (error instanceof ValidationError) {
          generateValidationErrorObject(error);
        }
      }
    }
    setLoading(false);
  };

  const userLogin = async () => {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    const res = await loginTokenCreateApi(payload);
    if (res?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      const accessToken =
        res.customerAccessTokenCreate.customerAccessToken.accessToken;
      updateState({
        type: CUSTOMER_ACCESS_TOKEN,
        payload: accessToken,
      });
      base64AccessToken = Base64.encode(
        res.customerAccessTokenCreate.customerAccessToken.accessToken
      );

      const sessionRes = await getUserAuthSessionApi(
        base64AccessToken,
        payload
      );
      if (sessionRes?.token) {
        updateState({
          type: CUSTOMER_SESSION_TOKEN,
          payload: sessionRes?.token,
        });
        updateData({ isLoggedIn: true });
        setLocalStorageItem(CUSTOMER_SESSION_TOKEN, sessionRes?.token);
        const authTokenRes = await getBoulevardAuthToken();
        if (authTokenRes?.is_boulevard_client) {
          updateState({
            type: BOULEVARD_AUTH_API_TOKEN,
            payload: authTokenRes?.token,
          });
        }
        const response = await getUserInfo();
        updateData({ userInfo: response });
        updateState({
          type: IS_BOULEVARD_CLIENT,
          payload:
            !!authTokenRes?.is_boulevard_client &&
            authTokenRes?.is_boulevard_client
              ? authTokenRes?.is_boulevard_client.toString()
              : 'false',
        });
        setLoading(false);
      } else {
        showToast({
          text: LOGIN_ERROR_MESSAGE,
          variant: 'error',
          isIcon: false,
        });
      }
    } else {
      showToast({
        text: LOGIN_ERROR_MESSAGE,
        variant: 'error',
        isIcon: false,
      });
    }
    setLoading(false);
  };
  const phoneNumberUpdate = async () => {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phoneNumber,
    };
    const res: ClientInfoResponse = await updatePhoneNumber(
      base64AccessToken,
      payload
    );
    if (res) {
      updateData({ userInfo: res });
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const { password = '', email = '', firstName = '', lastName = '' } = values;
    const variables = {
      password,
      email,
      firstName,
      lastName,
    };
    const res = await signUpCreateUserApi(variables);
    if (res?.customerCreate?.customer?.id) {
      // Analytics
      setLoading(false);
      await userLogin();
      await phoneNumberUpdate();
      history.push(
        isMembership ? MEMBERSHIP_WELCOME_ROUTE : INTAKE_WELCOME_ROUTE
      );
    } else {
      showToast({
        text: 'Unable to register user',
        variant: 'error',
        isIcon: false,
      });
    }
    setLoading(false);
  };

  return (
    <IntakeWrapper className='intake-sign-up'>
      <IntakeContentWrapper>
        <IntakeLoginContainer>
          <Grid container>
            <Grid item xs={12}>
              <StyledBackButton onClick={backNavigate} />
              <div className='header-container'>
                <div className='header-wrapper'>
                  <Typography variant='h2' className='header'>
                    Sign Up
                  </Typography>
                  <Typography variant='body1' className='title'>
                    Please use the same email you booked your appointment with.
                  </Typography>
                </div>
              </div>
              <div className='login-container'>
                <StyledFilledTextField
                  variant='filled'
                  fullWidth
                  label='Email'
                  className='input-field'
                  onChange={handleChange('email')}
                  onBlur={verifyEmail}
                  helperText={
                    <Typography variant='body2'>{errors?.email}</Typography>
                  }
                  error={errors.email ? true : false}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StyledFilledTextField
                      variant='filled'
                      fullWidth
                      label='First Name'
                      className='input-field'
                      onChange={handleChange('firstName')}
                      helperText={
                        <Typography variant='body2'>
                          {errors.firstName}
                        </Typography>
                      }
                      error={errors.firstName ? true : false}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledFilledTextField
                      variant='filled'
                      fullWidth
                      label='Last Name'
                      className='input-field'
                      onChange={handleChange('lastName')}
                      helperText={
                        <Typography variant='body2'>
                          {errors.lastName}
                        </Typography>
                      }
                      error={errors.lastName ? true : false}
                    />
                  </Grid>
                </Grid>

                <StyledFilledTextField
                  variant='filled'
                  fullWidth
                  label='Phone Number'
                  className='input-field'
                  onChange={handleChange('phoneNumber')}
                  error={errors.phoneNumber ? true : false}
                  helperText={
                    <Typography variant='body2'>
                      {errors.phoneNumber}
                    </Typography>
                  }
                />
                <StyledFilledTextField
                  fullWidth
                  variant='filled'
                  label='Password'
                  type={values.showPassword ? 'text' : 'password'}
                  className='input-field'
                  value={values.password}
                  onChange={handleChange('password')}
                  error={errors.password ? true : false}
                  helperText={
                    <Typography
                      variant='body1'
                      color={'var(--neutral-primary)'}
                    >
                      Must be 5 characters long
                    </Typography>
                  }
                  InputProps={{
                    endAdornment: values.showPassword ? (
                      <Eye
                        onClick={() => handleClickShowPassword('password')}
                      />
                    ) : (
                      <EyeSlash
                        onClick={() => handleClickShowPassword('password')}
                      />
                    ),
                  }}
                />
                <StyledFilledTextField
                  fullWidth
                  variant='filled'
                  label='Confirm Password'
                  type={values.showConfirmPassword ? 'text' : 'password'}
                  className='input-field'
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={errors.confirmPassword ? true : false}
                  helperText={
                    <Typography variant='body2'>
                      {errors.confirmPassword}
                    </Typography>
                  }
                  InputProps={{
                    endAdornment: values.showConfirmPassword ? (
                      <Eye
                        onClick={() =>
                          handleClickShowPassword('confirmPassword')
                        }
                      />
                    ) : (
                      <EyeSlash
                        onClick={() =>
                          handleClickShowPassword('confirmPassword')
                        }
                      />
                    ),
                  }}
                />
                <StyledButton
                  variant='contained'
                  value={
                    loading ? (
                      <CircularProgress color='info' size={20} />
                    ) : (
                      'Sign Up'
                    )
                  }
                  className='input-button'
                  isDisabled={isDisabled}
                  onClick={validation}
                  fontWeight={700}
                />
              </div>
            </Grid>
          </Grid>
        </IntakeLoginContainer>
      </IntakeContentWrapper>
      <img src={BottomCurve} className='bottom-curve' alt='bottom-curve' />
      <IntakeFooterWrapper></IntakeFooterWrapper>
    </IntakeWrapper>
  );
};

export default SignUp;
