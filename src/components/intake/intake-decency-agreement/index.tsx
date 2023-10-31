import { Grid, Link, Typography } from '@mui/material';
import DecencyImage from '../../../assets/images/intake/decency.png';
import { DecencyAgreementContainer } from './styles';
import StyledButton from '../../common/Button';
import { useHistory } from 'react-router-dom';
import { INTAKE_UPDATE_MESSAGE_ROUTE } from '../../../constants/intakeConstants';

const IntakeDecencyAgreement = () => {
  const decencyAgreement1 = [
    {
      normalText:
        'As hospitality professionals, we are committed to cultivating',
    },
    { strongText: 'a safe and inclusive community ' },
    {
      normalText:
        ' for anyone who steps through our doors – clients and team members – and to take action when this ideal fails to be upheld',
    },
  ];
  const decencyAgreement2 = [
    {
      normalText:
        'By visiting one of our shops, you agree that any instances of',
    },
    { strongText: 'discrimination, racism, misogyny, or aggression' },
    {
      normalText:
        ' will not be tolerated and may have consequences, up to being removed from our community.',
    },
  ];
  const decencyAgreement3 = [
    {
      normalText:
        'The purpose of this is to create the healthy boundaries we need to',
    },
    { strongText: 'protect decency,' },
    {
      normalText: 'to be',
    },
    { strongText: 'actively anti-racist, ' },
    {
      normalText: 'to be open to',
    },
    { strongText: 'dialogue in teachable moments,' },
    {
      normalText: 'and to be',
    },
    { strongText: 'decisive with egregious behavior.' },
  ];

  const history = useHistory();
  const navigate = () => {
    history.push(INTAKE_UPDATE_MESSAGE_ROUTE);
  };
  return (
    <DecencyAgreementContainer>
      <Grid container className='header-wrapper'>
        <Grid item xs={12}>
          <div className='section'>
          </div>
          <img
            src={DecencyImage}
            className='decency-image'
            alt='DecencyImage'
          />
          <div className='header-container'>
            <Typography
              variant='h2'
              textAlign={'center'}
              color={'var(--neutral-primary)'}
              className='header'
            >
              Decency Agreement
            </Typography>
            <Typography
              variant='body1'
              className='title'
              color={'var(--neutral-primary)'}
            >
              {'"'}
              {decencyAgreement1.map((item) => {
                return (
                  <>
                    <>{item.normalText} </>
                    <strong>{item.strongText} </strong>
                  </>
                );
              })}
              {'"'}
            </Typography>
            <Typography
              variant='body1'
              className='title'
              color={'var(--neutral-primary)'}
            >
              {'"'}
              {decencyAgreement2.map((item) => {
                return (
                  <>
                    <>{item.normalText} </>
                    <strong>{item.strongText} </strong>
                  </>
                );
              })}
              {'"'}
            </Typography>
            <Typography
              variant='body1'
              className='title'
              color={'var(--neutral-primary)'}
            >
              {'"'}
              {decencyAgreement3.map((item) => {
                return (
                  <>
                    <>{item.normalText} </>
                    <strong>{item.strongText} </strong>
                  </>
                );
              })}
              {'"'}
            </Typography>
            <StyledButton
              variant='contained'
              value='I Agree'
              fontWeight={700}
              onClick={navigate}
            />
            <Typography
              variant='body2'
              textAlign={'center'}
              className='agree-text'
              color={'var(--neutral-primary)'}
            >
              By agreeing, you are also consenting to our{' '}
              <Link
                href='https://www.heydayskincare.com/pages/service-product-policies'
                className='link'
                target='_blank'
              >
                Release of Liability and Waiver.
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </DecencyAgreementContainer>
  );
};

export default IntakeDecencyAgreement;
