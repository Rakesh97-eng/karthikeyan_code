import { Grid, Typography } from '@mui/material';
import { ReactComponent as HeyDay } from '../../../assets/icons/heyday-logo.svg';
import { ReactComponent as BottomCurve } from '../../../assets/icons/intake-curve.svg';
import StyledButton from '../../common/Button';
import { WelcomeContainer, WelcomeWrapper } from './intakeWelcome.styles';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const IntakeWelcome = () => {
  const history = useHistory();
  const navigate = () => {
    history.push(`/intake/login`);
  };
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <WelcomeContainer>
      <WelcomeWrapper>
        <Grid container>
          <Grid item xs={12}>
            <div className='success-container'>
              <div className='success-wrapper'>
                <div className='video-wrapper'>
                  <video
                    height={'100%'}
                    width={'100%'}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    className='video-player'
                    src='/videos/IntakeFormVideo5x4.mp4'
                    playsInline={true}
                  />
                <BottomCurve className='svg-icon' />
                </div>
                <div className='img-container'>
                  <HeyDay />
                </div>
                <div className='body-container'>
                  <div className='content'>
                    <Typography variant='h2' className='header'>
                      Time to get to know each other...
                    </Typography>
                    <Typography variant='body1' className='title'>
                      Like a first date, only less awkward.
                    </Typography>
                  </div>
                  <StyledButton
                    variant='contained'
                    value='Let’s Get Started'
                    className='input-button'
                    onClick={navigate}
                  />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </WelcomeWrapper>
    </WelcomeContainer>
  );
};

export default IntakeWelcome;
