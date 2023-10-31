import { useState, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import StyledButton from '../../common/Button';
import {
  IntakeContentWrapper,
  IntakeFooterWrapper,
  IntakeLoginContainer,
  IntakeWrapper,
  StyledFilledTextField,
} from '../intake.styles';
import BottomCurve from '../../../assets/icons/intake-bottom-curve.svg';
import { useHistory, useParams } from 'react-router-dom';
import StyledBackButton from '../styledBackButton';
import { ReactComponent as Eye } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../assets/icons/eye-slash.svg';
import { SIGNUP_MESSAGES } from '../../../constants/Helpers';
import { textTrimmer } from '../../../utils/helper-functions/common';
import { resetPasswordApi } from '../../../services/user';
import { ResetPasswordPayload, ResetPayloadResponse } from '../../../types/sessionTypes';
import { ToastContext } from '../../../providers/context/toastContext';
import { RESET_ERROR_MSG,INTAKE_RESET_SUCCESS } from '../../../constants/intakeConstants';

interface State {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

interface FieldValidate {
  password: string;
  confirmPassword: string;
}

type resetParamsType={
  id:string
  resetToken:string
}

const ResetPassword = () => {
  const {id='',resetToken=''} = useParams<resetParamsType>()
  const { showToast } = useContext(ToastContext);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [values, setValues] = useState<State>({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errors, setErrors] = useState<FieldValidate>({
    password: '',
    confirmPassword: '',
  });
  const backNavigate = () => {
    history.goBack();
  };


  let fieldValid = {
    password: '',
    confirmPassword: '',
  };

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
      const newValues: State = {
        ...values,
        [prop]: textTrimmer(event.target.value),
      };

      setValues(newValues);

      if (newValues.password && newValues.confirmPassword) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

  const fieldValidate = () => {
    fieldValid = {
      password: '',
      confirmPassword: '',
    };
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

    setErrors(fieldValid);

    return Object.values(fieldValid).every((x) => x === '');
  };

  const handleSubmit = async () => {
    const { password } = values;
    setLoading(true);
    if (fieldValidate()) {
      const payload:ResetPasswordPayload = {
        id:`gid://shopify/Customer/${id}`,
        input:{
          password,
          resetToken
        }
      }
      const res:ResetPayloadResponse = await resetPasswordApi(payload);
      if(!res.customerReset.customerAccessToken){
        showToast({
          text: RESET_ERROR_MSG,
          variant: 'error',
          isIcon: false,
        });
      }else if(res.customerReset.customerAccessToken){
        history.push(INTAKE_RESET_SUCCESS)
      }
    }
    setLoading(false);
  };

  return (
    <IntakeWrapper>
      <IntakeContentWrapper>
        <IntakeLoginContainer>
          <Grid container>
            <Grid item xs={12}>
              <StyledBackButton onClick={backNavigate} />
              <div className='header-container'>
                <div className='header-wrapper'>
                  <Typography variant='h2' className='header'>
                    Reset Password
                  </Typography>
                  <Typography variant='body1' className='title'>
                    Please use the new password when you sign in .
                  </Typography>
                </div>
              </div>
              <div className='login-container'>
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
                    <Typography variant='body2'>{errors.password}</Typography>
                  }
                  InputProps={{
                    endAdornment: values.showPassword ? (
                      <EyeSlash
                        onClick={() => handleClickShowPassword('password')}
                      />
                    ) : (
                      <Eye
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
                      <EyeSlash
                        onClick={() =>
                          handleClickShowPassword('confirmPassword')
                        }
                      />
                    ) : (
                      <Eye
                        onClick={() =>
                          handleClickShowPassword('confirmPassword')
                        }
                      />
                    ),
                  }}
                />
                <StyledButton
                  variant='contained'
                  value={loading ? 'loading...' : 'Reset'}
                  className='input-button'
                  isDisabled={isDisabled}
                  onClick={handleSubmit}
                  fontWeight={700}
                />
              </div>
            </Grid>
          </Grid>
        </IntakeLoginContainer>
      </IntakeContentWrapper>
      <img src={BottomCurve} className='bottomCurve' alt='bottom-curve' />
      <IntakeFooterWrapper></IntakeFooterWrapper>
    </IntakeWrapper>
  );
};

export default ResetPassword;
