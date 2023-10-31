import React from 'react';
import {
  FooterCardContainer,
  FooterCardWrapper,
  IntakeFooterContainer,
  IntakeHeaderContainer,
  IntakeSectionContainer,
} from './styles';
import BottomCurve from '../../../assets/icons/intake-brown-curve.svg';
import { ReactComponent as AppleIcon } from '../../../assets/icons/apple-icon.svg';
import FooterImage from '../../../assets/icons/intake-icons/footer-image.svg';
import FooterImageSmall from '../../../assets/icons/intake-icons/footer-image-small.svg';
import { Grid, Link, Typography, Stack } from '@mui/material';
import MessageCard from './messageCard';
import { StyledIconButton } from '../intake.styles';
import { UPDATE_MESSAGE_LIST } from '../../../constants/intakeConstants';
import { APP_DOWNLOAD_LINK } from '../../../constants/Helpers';

const UpdateMessage = () => {
  return (
    <IntakeSectionContainer>
      <IntakeHeaderContainer backgroundColor={'var(--honey-50)'}>
        <Grid container>
          <Grid item xs={12}>
            <div className='header-container'>
              <Typography
                variant='h2'
                textAlign={'center'}
                color={'var(--neutral-primary)'}
              >
                See you soon!
              </Typography>
              <Typography
                variant='body1'
                textAlign={'center'}
                className='title'
                color={'var(--neutral-primary)'}
              >
                If you need to make any changes to your intake form, please let
                your Skin Therapist know at your appointment. We look forward to
                seeing you!
              </Typography>
            </div>
            <MessageCard cardList={UPDATE_MESSAGE_LIST} />
          </Grid>
        </Grid>
      </IntakeHeaderContainer>
      <img src={BottomCurve} className='bottom-curve' alt='bottom-curve' />
      <IntakeFooterContainer>
        <FooterCardContainer>
          <FooterCardWrapper>
            <div className='content-wrapper'>
              <Typography variant='h4' color='var(--neutral-primary)'>
                Get the App
              </Typography>
              <Typography
                variant='body2'
                color='var(--neutral-primary)'
                className='footer-text'
              >
                Manage appointments, review treatment records, shop our products
                & more.
              </Typography>
              <Link
                sx={{ textDecoration: 'none' }}
                href={APP_DOWNLOAD_LINK}
                target='_blank'
              >
                <StyledIconButton
                  startIcon={<AppleIcon />}
                  className='icon-btn'
                >
                  <Typography variant='btn' color='var(--neutral-secondary)'>
                    Download Now
                  </Typography>
                </StyledIconButton>
              </Link>
            </div>
            <Stack className='svg-sm-container'>
              <img src={FooterImageSmall} className='svg-icon' />
            </Stack>
            <Stack className='svg-md-container'>
              <img src={FooterImage} className='svg-icon' />
            </Stack>
          </FooterCardWrapper>
        </FooterCardContainer>
      </IntakeFooterContainer>
    </IntakeSectionContainer>
  );
};
export default UpdateMessage;
