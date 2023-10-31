import {
  IntakeFooterContainer,
  IntakeHeaderContainer,
  IntakeSectionContainer,
} from './styles';
import BottomCurve from '../../../assets/icons/intake-icons/consent-curve.svg';
import { Grid, Typography } from '@mui/material';
import MessageCard from './messageCard';
import { WAIT_FOR_CONSENT_LIST } from '../../../constants/intakeConstants';
const WaitingForConsent = () => {
  return (
    <IntakeSectionContainer>
      <IntakeHeaderContainer backgroundColor='var(--peony-50)'>
        <Grid container>
          <Grid item xs={12}>
            <div className='header-container'>
              <Typography
                variant='h2'
                textAlign={'center'}
                color={'var(--neutral-primary)'}
              >
                In the meantime...
              </Typography>
              <Typography
                variant='body1'
                textAlign={'center'}
                className='title'
                color={'var(--neutral-primary)'}
              >
                Check out a few helpful articles to get ready for your first
                Heyday facial.
              </Typography>
            </div>
            <MessageCard cardList={WAIT_FOR_CONSENT_LIST} />
          </Grid>
        </Grid>
      </IntakeHeaderContainer>
      <img src={BottomCurve} className='bottom-img' alt='bottom-curve' />
      <IntakeFooterContainer>
        <div className='empty-footer'></div>
      </IntakeFooterContainer>
    </IntakeSectionContainer>
  );
};
export default WaitingForConsent;
