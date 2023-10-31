import { CircularProgress, Grid, Link, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import StyledButton from '../../common/Button';
import { IntakeLoginContainer, StyledFilledTextField } from '../intake.styles';

import { ToastContext } from '../../../providers/context/toastContext';
import { useHistory } from 'react-router-dom';
import IntakeHomeWrapper from '../intakeAuthWrapper';
import StyledBackButton from '../styledBackButton';
import {
  INTAKE_FORGOT_ROUTE,
  INTAKE_SIGNUP_ROUTE,
  INTAKE_UPDATE_MESSAGE_ROUTE,
  INTAKE_WELCOME_ROUTE,
  LOGIN_ERROR_MESSAGE,
} from '../../../constants/intakeConstants';
import { userSignInSchema } from '../../../utils/yup-schema/user';
import { ValidationError } from 'yup';
import { generateValidationErrorObject } from '../../../utils/helper-functions/yup';
import {
  getBoulevardAuthToken,
  loginTokenCreateApi,
} from '../../../services/session';
import {
  BOULEVARD_AUTH_API_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  CUSTOMER_SESSION_TOKEN,
  IS_BOULEVARD_CLIENT,
  MEMBERSHIP_FORGOT_ROUTE,
  MEMBERSHIP_SIGN_UP_ROUTE,
  MEMBERSHIP_WELCOME_ROUTE,
  SHOPIFY_STATUS,
  SIGNUP_MESSAGES,
} from '../../../constants/Helpers';
import {
  emailVerification,
  getUserAuthSessionApi,
  getUserInfo,
} from '../../../services/user';
import { Base64 } from 'js-base64';
import { CustomerDetailsContext } from '../../../providers/context/IntakeClientContext';
import { textTrimmer } from '../../../utils/helper-functions/common';
import { ReactComponent as Eye } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../assets/icons/eye-slash.svg';
import {
  emailVerifier,
  setLocalStorageItem,
} from '../../../utils/helper-functions/user';
import { TMembership } from '../../../types/commonTypes';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

interface FieldValidate {
  email: string;
  password: string;
}

const IntakeLogin = ({ isMembership }: TMembership) => {
  const history = useHistory();
  const backNavigate = () => {
    history.goBack();
  };
  const { updateState, customerData, updateData } = useContext(
    CustomerDetailsContext
  );
  const { showToast } = useContext(ToastContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [values, setValues] = useState<State>({
    email: customerData.email ? customerData.email : '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState<FieldValidate>({
    email: '',
    password: '',
  });

  let fieldValid = {
    email: '',
    password: '',
  };

  const navigate = (navPath: string) => {
    history.push(isMembership ? MEMBERSHIP_WELCOME_ROUTE : navPath);
  };
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValues: State = { ...values, [prop]: event.target.value };
      if (prop === 'email' && event.target.value) {
        newValues.email = event.target.value.toLowerCase();
      }
      setValues(newValues);
      if (textTrimmer(newValues.email) && textTrimmer(newValues.password)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const fieldValidate = () => {
    fieldValid = {
      email: '',
      password: '',
    };
    fieldValid.email = emailVerifier(values.email)
      ? ''
      : SIGNUP_MESSAGES.INVALID_EMAIL;

    if (textTrimmer(values.password)) {
      fieldValid.password =
        values.password.length >= 5 ? '' : SIGNUP_MESSAGES.PASSWORD_INVALID;
    } else {
      fieldValid.password = SIGNUP_MESSAGES.REQUIRED;
    }

    setErrors(fieldValid);
    return Object.values(fieldValid).every((x) => x === '');
  };
  const validate = async () => {
    if (fieldValidate()) {
      try {
        await userSignInSchema.validate(values, {
          abortEarly: false,
        });
        return true;
      } catch (error) {
        if (error instanceof ValidationError) {
          generateValidationErrorObject(error);
        }
        return false;
      }
    }
  };

  const verifyEmail = async () => {
    const res = await emailVerification(values.email);
    if (res?.customer?.shopify_status === SHOPIFY_STATUS.ENABLED) {
      updateData({
        userInfo: {
          ...customerData.userInfo,
          first_name: res.customer.first_name,
          last_name: res.customer.last_name,
        },
      });
      return true;
    } else if (res?.customer?.shopify_status === SHOPIFY_STATUS.INVITED) {
      showToast({
        text: SIGNUP_MESSAGES.SHOPIFY_STATUS_LOGIN,
        variant: 'error',
        isIcon: false,
        horizontal: 'center',
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    if (await validate()) {
      if (await verifyEmail()) {
        let base64AccessToken = '';
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
            if (response.is_intake_submitted) {
              navigate(INTAKE_UPDATE_MESSAGE_ROUTE);
            } else {
              navigate(INTAKE_WELCOME_ROUTE);
            }
          } else {
            showToast({
              text: LOGIN_ERROR_MESSAGE,
              variant: 'error',
              isIcon: false,
              horizontal: 'center',
            });
          }
        } else {
          showToast({
            text: LOGIN_ERROR_MESSAGE,
            variant: 'error',
            isIcon: false,
            horizontal: 'center',
          });
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <IntakeHomeWrapper>
      <IntakeLoginContainer>
        <Grid container>
          <Grid item xs={12}>
            <StyledBackButton onClick={backNavigate} />
            <div className='header-container'>
              <div className='header-wrapper'>
                <Typography variant='h2' className='header'>
                  Sign In
                </Typography>
                <Typography variant='body1' className='title'>
                  Use the same email and password you used to{' '}
                  {isMembership
                    ? 'purchase your membership.'
                    : 'book your appointment.'}
                </Typography>
              </div>
            </div>
            <div className='login-container'>
              <StyledFilledTextField
                variant='filled'
                fullWidth
                label='Email'
                className='input-field'
                value={values.email}
                onChange={handleChange('email')}
                onBlur={() => verifyEmail()}
                helperText={
                  <Typography variant='body2'>
                    {errors?.email ? errors?.email : ''}
                  </Typography>
                }
                error={errors?.email ? true : false}
              />
              <StyledFilledTextField
                fullWidth
                variant='filled'
                label='Password'
                type={values.showPassword ? 'text' : 'password'}
                className='input-field'
                value={values.password}
                error={errors.password ? true : false}
                onChange={handleChange('password')}
                helperText={
                  <Typography variant='body2'>
                    {errors.password ? errors.password : ''}
                  </Typography>
                }
                InputProps={{
                  endAdornment: values.showPassword ? (
                    <Eye onClick={handleClickShowPassword} />
                  ) : (
                    <EyeSlash onClick={handleClickShowPassword} />
                  ),
                }}
              />
              <Link
                href={
                  isMembership ? MEMBERSHIP_FORGOT_ROUTE : INTAKE_FORGOT_ROUTE
                }
                target='_blank'
                className='link'
              >
                Forgot Password?
              </Link>
              <StyledButton
                variant='contained'
                value={
                  loading ? (
                    <CircularProgress color='info' size={20} />
                  ) : (
                    'Sign In'
                  )
                }
                className='input-button'
                isDisabled={isDisabled}
                onClick={handleSubmit}
                fontWeight={700}
              />
              <Typography
                variant='body1'
                textAlign='center'
                color={'var(--neutral-primary)'}
              >
                Don’t have an account?{' '}
                <Link
                  href={
                    isMembership
                      ? MEMBERSHIP_SIGN_UP_ROUTE
                      : INTAKE_SIGNUP_ROUTE
                  }
                  className='link'
                >
                  Sign Up
                </Link>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </IntakeLoginContainer>
    </IntakeHomeWrapper>
  );
};

export default IntakeLogin;
