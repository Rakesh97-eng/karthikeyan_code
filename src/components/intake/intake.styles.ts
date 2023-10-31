import { Button, FilledInput, FormControl, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const IntakeContentWrapper = styled('div')({
  backgroundColor: 'var(--peony-50)',
  minHeight: '582px',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width:501px)': {
    minHeight: 'unset',
  },
});
export const IntakeFooterWrapper = styled('div')({
  backgroundColor: 'var(--neutral-tertiary)',
  minHeight: '460px',
  display: 'flex',
  justifyContent: 'center',

  '.intake-icon-wrapper': {
    display: 'flex',
    justifyContent: 'space-center',
    minWidth: '588px',
  },
  '.seeds-icon': {
    zIndex: '1',
    right: '80px',
    position: 'relative',
  },
  '.lake-icon': {
    right: '10%',
    position: 'absolute',
    bottom: '5%',
  },

  '.slice-icon': {
    position: 'absolute',
    bottom: '0',
  },

  '@media (max-width:880px)': {
    '.seeds-icon': { right: '40px' },
    '.lake-icon': { right: '-5%', top: '77%' },

    '.slice-icon': {
      left: '9%',
      top: '80%',
    },
  },
  '@media (max-width:501px)': {
    position: 'relative',
    marginTop: '6px',
    minHeight: 'unset',
    '.seeds-icon': { right: '0px' },
    '.lake-icon': { right: '-10%', top: '64px' },

    '.slice-icon': {
      display: 'none',
    },
    '.intake-icon-wrapper': {
      minWidth: '425px',
    },
  },
});

export const IntakeWrapper = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width:501px)': {
    minHeight: '720px',
    '&.intake-sign-up': {
      minHeight: '860px',
    },
  },
  '.bottom-curve': {
    position: 'absolute',
    left: 0,
    width: '100%',
    marginTop: '-1px',
  },
});

export const IntakeLoginContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '588px',
  padding: '40px 24px 22px 24px ',
  '.header-container': {
    display: 'flex',
    justifyContent: 'center',
    '.header-wrapper': {
      maxWidth: '384px',
    },
  },
  '.header': {
    textAlign: 'center',
    color: 'var(--neutral-primary)',
    paddingBottom: '8px',
    paddingTop: '16px',
    maxWidth: '384px',
  },
  '.title': {
    textAlign: 'center',
    color: 'var(--neutral-primary)',
    paddingBottom: '40px',
    maxWidth: '384px',
  },
  '.input-field': {
    paddingBottom: '24px',
  },
  '.forgot-container': {
    minWidth: '588px',
  },
  '@media (max-width:501px)': {
    paddingTop: '16px',
    paddingBottom: '40px',
    '.forgot-container': {
      minWidth: 'auto',
    },
  },
  '.link': {
    color: 'var(--ocean-100)',
    textDecorationColor: 'var(--ocean-100)',
  },
  '.input-button': {
    marginTop: '24px',
  },
  '.custom-padding': {
    paddingBottom: '24px',
  },
});
export const StyledFilledTextField = styled(TextField)({
  '.MuiFilledInput-root': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 14px',
    gap: '4px',
    backgroundColor: 'var(--neutral-secondary) !important',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--neutral-primary)',
    fontSize: '16px',
  },
  '.MuiFilledInput-input': {
    padding: '0px',
    paddingTop: '16px',
  },
  '& .MuiFilledInput-root:before , & .MuiFilledInput-root:after , & .MuiFilledInput-root:hover:before , & .MuiFilledInput-root:hover:not(.Mui-disabled):before':
    {
      border: 'none',
    },
  '& label.Mui-focused': {
    textTransform: 'uppercase',
    color: 'var(--neutral-primary-light)',
  },
  '.MuiInputLabel-root': {
    fontSize: '16px',
    color: 'var(--neutral-primary-light)',
    '&[data-shrink="true"]': {
      textTransform: 'uppercase',
      fontSize: '12px',
      letterSpacing: '0.03em',
    },
  },

  '.MuiFormHelperText-root': {
    margin: '0px',
    marginTop: '8px',
    '.Mui-error': {
      color: 'var(--negative-primary)',
    },
  },
});

export const StyledIconButton = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 12px',
  gap: '8px',
  textTransform: 'none',
  '.MuiButton-startIcon': {
    margin: '0px',
  },
  '@media (max-width:501px)': {
    marginLeft: '-12px',
  },
});

export const StyledPasswordTextInput = styled(FilledInput)({
  backgroundColor: 'var(--neutral-secondary)!important',
  border: 'none',
  borderRadius: '8px',
  color: 'var(--neutral-primary-light)',
  ':before,:after,:hover:before,:hover:not(.Mui-disabled):before': {
    borderBottom: 'none',
  },
  input: {
    borderRadius: '8px',
  },
});
export const StyledFormControl = styled(FormControl)({
  '& .MuiInputLabel-root': {
    color: 'var(--neutral-primary-light)',

    '&[data-shrink="true"]': {
      textTransform: 'uppercase',
      color: 'var(--neutral-primary-light)',
    },
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: 'var(--neutral-primary-light)',
  },
  '.MuiFormHelperText-root': {
    margin: '0px',
    marginTop: '8px',
  },
  '.MuiIconButton-root': {
    padding: '20px',
  },
});
