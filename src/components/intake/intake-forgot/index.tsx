import { CircularProgress, Grid, Typography } from '@mui/material';
import StyledButton from '../../common/Button';
import { IntakeLoginContainer, StyledFilledTextField } from '../intake.styles';
import IntakeHomeWrapper from '../intakeAuthWrapper';
import { useHistory } from 'react-router-dom';
import StyledBackButton from '../styledBackButton';
import { useState, useContext } from 'react';
import { ToastContext } from '../../../providers/context/toastContext';
import { emailVerification, forgetPasswordApi } from '../../../services/user';
import {
  FORGET_MESSAGES,
  MEMBERSHIP_FORGOT_SUCCESS_ROUTE,
  MEMBERSHIP_LOGIN_ROUTE,
  SIGNUP_MESSAGES,
} from '../../../constants/Helpers';
import { emailVerifier } from '../../../utils/helper-functions/user';
import {
  INTAKE_FORGOT_SUCCESS_ROUTE,
  INTAKE_LOGIN_ROUTE,
} from '../../../constants/intakeConstants';
import { TMembership } from '../../../types/commonTypes';

const Forgot = ({ isMembership }: TMembership) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const navigate = () => {
    history.push(
      isMembership
        ? MEMBERSHIP_FORGOT_SUCCESS_ROUTE
        : INTAKE_FORGOT_SUCCESS_ROUTE
    );
  };
  const backNavigate = () => {
    history.push(isMembership ? MEMBERSHIP_LOGIN_ROUTE : INTAKE_LOGIN_ROUTE);
  };
  const { showToast } = useContext(ToastContext);

  const validate = () => {
    setEmailError(emailVerifier(email) ? '' : SIGNUP_MESSAGES.INVALID_EMAIL);
    return emailError ? false : true;
  };

  const verifyEmail = async () => {
    setLoading(true);
    const res = await emailVerification(email);
    if (res?.customer?.shopify_status === 'invited') {
      showToast({
        text: SIGNUP_MESSAGES.SHOPIFY_STATUS_LOGIN,
        variant: 'error',
        isIcon: false,
      });
      setLoading(false);
      return false;
    } else {
      setLoading(false);
      return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validate()) {
      if (await verifyEmail()) {
        const res = await forgetPasswordApi({ email });
        if (res?.customerRecover?.customerUserErrors?.[0]?.message) {
          const MSG = res?.customerRecover?.customerUserErrors?.[0]?.message;
          showToast({
            text: MSG,
            variant: 'error',
            isIcon: false,
          });
        } else if (res?.customerRecover?.customerUserErrors) {
          if (!res.customerRecover.customerUserErrors.length) {
            setLoading(false);
            navigate();
          }
        } else if (res?.customerRecover === null) {
          showToast({
            text: FORGET_MESSAGES.LIMIT_EXCEEDED,
            variant: 'error',
            isIcon: false,
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <IntakeHomeWrapper>
      <IntakeLoginContainer>
        <Grid container>
          <Grid item xs={12}>
            <StyledBackButton onClick={backNavigate} />
            <div className='header-container'>
              <div className='header-wrapper'>
                <Typography variant='h2' className='header'>
                  Forgot Password?
                </Typography>
                <Typography variant='body1' className='title'>
                  We’ll send you an email with instructions to reset your
                  password.
                </Typography>
              </div>
            </div>
            <div className='login-container forgot-container'>
              <StyledFilledTextField
                variant='filled'
                fullWidth
                label={'Email Address'}
                className='input-field'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value.trim())
                }
                helperText={
                  <Typography variant='body2'>
                    {emailError ? emailError : ''}
                  </Typography>
                }
                error={emailError ? true : false}
              />
              <StyledButton
                variant='contained'
                value={
                  loading ? (
                    <CircularProgress color='info' size={20} />
                  ) : (
                    'Send Email'
                  )
                }
                isDisabled={email ? false : true}
                onClick={handleSubmit}
                fontWeight={700}
              />
            </div>
          </Grid>
        </Grid>
      </IntakeLoginContainer>
    </IntakeHomeWrapper>
  );
};

export default Forgot;
