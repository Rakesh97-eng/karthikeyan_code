import {
  IntakeFooterContainer,
  IntakeHeaderContainer,
  IntakeSectionContainer,
} from './styles';
import BottomCurve from '../../../assets/icons/intake-icons/consent-curve.svg';
import { Grid, Typography } from '@mui/material';
import MessageCard from './messageCard';
import { TOO_YOUNG_LIST } from '../../../constants/intakeConstants';
const TooYoung = () => {
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
                Sorry about that!
              </Typography>
              <Typography
                variant='body1'
                textAlign={'center'}
                className='title'
                color={'var(--neutral-primary)'}
              >
                Even though you can’t get a facial from us yet, we’ve got some
                helpful tips to manage your healthiest skin.
              </Typography>
            </div>
            <MessageCard cardList={TOO_YOUNG_LIST} />
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
export default TooYoung;
