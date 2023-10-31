import { styled } from '@mui/material';
import UpperCurve from '../../../../assets/icons/upper-curve.svg';

export const SearchBoxWrapper = styled('div')({
  backgroundColor: 'var(--neutral-secondary-darker)',
  marginTop: '46px',
  padding: '16px',
  paddingTop: '1px',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '22px',
    backgroundImage: `url(${UpperCurve})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    right: '0px',
    marginTop: '-22px',
  },
});

export const ClientFollowUpContainer = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '16px',
  padding: '24px',
  marginTop: '24px',
  '& .segment-title': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    '& .title': {
      margin: '0px 8px',
      color: 'var(--neutral-primary)',
    },
  },
  '& .title-content': {
    color: 'var(--neutral-primary)',
  },
  '& .option-title': {
    paddingBottom: '16px',
    paddingTop: '24px',
    color: 'var(--neutral-primary)',
  },
  '& .checkbox-wrapper': {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  '& .questions-wrapper': {
    '.MuiTypography-root': {
      display: 'flex',
    },
  },
  '& .dark-text': {
    color: 'var(--nautral-primary)',
    paddingBottom: '8px',
  },
  '& .light-text': {
    color: 'var(--neutral-primary-light)',
    paddingBottom: '16px',
  },
  '& .button-wrapper': {
    paddingTop: '48px',
  },
  '.sub-head': {
    fontWeight: 'bold',
    color: 'var(--neutral-primary)',
  },
  '.sub-head-wrapper': {
    margin: '0px',
    marginLeft: '24px',
    padding: '0px',
  },
  '.list-item-wrapper': {
    margin: '4px 0px 0px 24px',
    padding: '0px',
  },
  '.list-item': {
    color: 'var(--neutral-primary-light)',
    marginBottom: '4px',
    '.inner-list': {
      listStyle: 'disc',
    },
    '.li-text': {
      color: 'var(--neutral-primary)',
    },
  },
});
