import { Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Hand } from '../../../assets/icons/intake-hand.svg';
import { INTAKE_BASIC_SECTION_ROUTE } from '../../../constants/intakeConstants';
import { CustomerDetailsContext } from '../../../providers/context/IntakeClientContext';
import { WelcomeContainer, AfterWelcomeWrapper } from './intakeWelcome.styles';

const IntakeAfterWelcome = () => {
  const [isAnimationDown, setIsAnimationDown] = useState<boolean>(false);
  const { customerData } = useContext(CustomerDetailsContext);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      setIsAnimationDown(true);
    }, 2500);
  }, []);
  const navigate = () => {
    if (isAnimationDown) {
      // this is intentional
      history.push(INTAKE_BASIC_SECTION_ROUTE);
    }
  };
  return (
    <WelcomeContainer>
      <AfterWelcomeWrapper>
        <Grid container>
          <Grid item xs={12}>
            <div
              className={
                isAnimationDown ? 'success-container-down' : 'success-container'
              }
              onAnimationEnd={navigate}
            >
              <div className='success-wrapper'>
                <div className='img-container'>
                  <Hand />
                </div>
                <Typography variant='h3' className='header'>
                  Nice to meet you, {`${customerData?.userInfo?.first_name}`}
                </Typography>
                <Typography variant='body1' className='title'>
                  {' '}
                  Let’s get started.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </AfterWelcomeWrapper>
    </WelcomeContainer>
  );
};

export default IntakeAfterWelcome;
