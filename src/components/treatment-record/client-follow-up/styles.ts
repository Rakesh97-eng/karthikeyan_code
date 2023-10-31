import { styled, Paper } from '@mui/material';
import UpperCurve from '../../../assets/icons/upper-curve.svg';

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
    '@media(max-width:400px)': {
      '.submit-btn': {
        padding: '0px',
      },
    },
  },
});

export const StyledPaper = styled(Paper)({
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid var(--neutral-secondary-darker)',
  '& .close-filled-icon': {
    margin: '12px',
  },
  '& .MuiInputBase-input': {
    color: 'var(--neutral-primary-light)',
  },
});

export const ListViewContainer = styled('div')({
  height: '320px',
  overflowY: 'scroll',
  zIndex: '9999',
  marginTop: '16px',
  marginBottom: '16px',
  border: '1px solid var(--neutral-secondary-darker)',
  backgroundColor: 'var(--neutral-secondary)',
  boxShadow:
    '6px 8px 12px rgba(0, 0, 0, 0.04),1px 1px 4px rgba(0, 0, 0, 0.08), 4px 6px 8px rgba(0, 0, 0, 0.06)',
  borderRadius: '8px',
  '& .list-box-title': {
    padding: '16px',
    color: 'var(--dark-black)',
  },
  '& .card-wrapper': {
    padding: '0',
    overflow: 'auto',
    height: '320px',
  },
  '& .card-item': {
    padding: '0px',
    height: '88px',
    cursor: 'pointer',
    paddingLeft: '16px',
  },
  '& .select-icon': {
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  '& .list-avatar-set': {
    position: 'relative',
    borderRadius: '4px',
    height: '72px',
    width: '54px',
    marginRight: '16px',
    marginTop: '8px',
    marginBottom: '8px',
  },
  '& .avatar-set': {
    borderRadius: '4px',
    height: '72px',
    width: '54px',
    marginRight: '16px',
  },
  '& .set-opacity': {
    opacity: '0.5',
  },
  '& .primary-txt': {
    color: 'var(--neutral-primary-light)',
    '& .secondary-text': {
      marginTop: '8px',
      color: 'var(--neutral-primary)',
    },
  },
  '& .text-highlight': {
    backgroundColor: 'var(--honey-50)',
  },

  '& .MuiAvatar-img': {
    height: '100% !important',
  },
  ' ::-webkit-scrollbar': {
    display: 'none',
  },
  '@media(max-width:400px)': {
    '& .primary-txt': {
      '& .secondary-text': {
        marginTop: '0px',
      },
    },
    '& .list-avatar-set': {
      margin: '0px',
      marginRight: '16px',
    },
  },
});
export const CardFooterWrapper = styled('div')({
  display: 'flex',
  marginTop: '8px',
  ' .card-icon': {
    marginRight: '7px',
  },
  '& .chip-style': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 8px 3px',
    position: 'static',
    width: '39px',
    height: '20px',
    background: 'var(--neutral-secondary-dark)',
    borderRadius: '10px',
    marginRight: '8px',
  },
  ' .MuiChip-label': {
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0',
    textOverflow: 'clip',
    overflow: 'hidden',
  },
  '& .card-footer-date': {
    color: 'var(--neutral-primary-light)',
    margin: '0px',
  },
  '& .custom-divider': {
    height: '18px',
    marginRight: '8px',
  },
  '& .card-icon1': {
    marginTop: '5px',
    marginRight: '7px',
  },
  '@media(max-width:400px)': {
    marginTop: '0px',
  },
});

export const SelectedCard = styled('div')({
  '& .card-wrapper': {
    border: '1px solid var(--neutral-secondary-darker)',
    borderRadius: '8px',
  },
  '& .card-item': {
    paddingBottom: '8px',
    paddingTop: '8px',
  },
  '& .list-avatar-set': {
    height: '72px',
    width: '56px',
    borderRadius: '8px',
    marginRight: '16px',
  },
  '& .primary-txt': {
    textTransform: 'uppercase',
    color: 'var(--neutral-primary-light)',
    letterSpacing: '0.06em',
    '.brand-name': {
      letterSpacing: '0.06em',
    },
    '& .secondary-text': {
      marginTop: '8px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  '& .chip-style': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 8px 3px',
    position: 'static',
    width: '39px',
    height: '20px',
    background: 'var(--neutral-secondary-dark)',
    borderRadius: '10px',
    marginRight: '8px',
  },
  ' .MuiChip-label': {
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0',
    textOverflow: 'clip',
    overflow: 'hidden',
  },
});
