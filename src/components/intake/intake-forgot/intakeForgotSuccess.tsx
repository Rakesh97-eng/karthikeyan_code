import { Grid, Typography } from '@mui/material';
import { ReactComponent as ForgotSuccess } from '../../../assets/icons/forgot-success.svg';
import {
  ForgotSuccessContainer,
  ForgotSuccessWrapper,
} from './intakeForgot.styles';
import StyledBackButton from '../styledBackButton';
import { useHistory } from 'react-router-dom';

const IntakeForgotSuccess = () => {
  const history = useHistory();
  const backNavigate=()=>{
    history.goBack();
}
  return (
    <ForgotSuccessContainer>
      <ForgotSuccessWrapper>
        <Grid container>
          <Grid item xs={12}>
          <StyledBackButton onClick={backNavigate}/>

            <div className='success-container'>
              <div className='success-wrapper'>
                <div className='img-container'>
                  <ForgotSuccess />
                </div>

                <Typography variant='h3' className='header'>
                  Almost There!
                </Typography>
                <Typography variant='body1' className='title'>
                  {' '}
                  Check your email to reset your password.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </ForgotSuccessWrapper>
    </ForgotSuccessContainer>
  );
};

export default IntakeForgotSuccess;
