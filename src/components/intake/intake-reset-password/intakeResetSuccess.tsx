import { Grid, Typography } from '@mui/material';
import { ReactComponent as ForgotSuccess } from '../../../assets/icons/forgot-success.svg';
import {
  ForgotSuccessContainer,
  ForgotSuccessWrapper,
} from '../intake-forgot/intakeForgot.styles';
import StyledBackButton from '../styledBackButton';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { INTAKE_LOGIN_ROUTE } from './../../../constants/intakeConstants';
import StyledButton from '../../common/Button';

const IntakeResetSuccess = () => {
  const history = useHistory();
  const backNavigate=()=>{
    history.push(INTAKE_LOGIN_ROUTE)
}
  useEffect(() => {
    setTimeout(()=>{
        history.push(INTAKE_LOGIN_ROUTE)
    },2000)
  },[])
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
                  Success
                </Typography>
                <Typography variant='body1' className='title'>
                  {' '}
                  You password changed successfully!
                </Typography>
                <Typography display='block'>
                  <StyledButton variant='contained' fullWidth={false} value="login"/>
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </ForgotSuccessWrapper>
    </ForgotSuccessContainer>
  );
};

export default IntakeResetSuccess;
