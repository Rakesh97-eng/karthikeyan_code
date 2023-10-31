import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const StyledDateTextField = styled(TextField)({
  marginTop: '16px',
  borderRadius: '8px',
  border: '1px solid var(--neutral-secondary-darker)',
  padding: '20px',
  backgroundColor: 'var(--neutral-secondary)',
  textTransform: 'uppercase',
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  '& label.Mui-focused': {
    top: '10px',
    left: '20px',
    textTransform: 'uppercase',
    color: 'var(--neutral-primary-light)',
  },
  '&.custom-styled': {
    borderRadius: '8px',
    border: '1px solid var(--neutral-secondary-darker)',
    padding: '10px 20px',
  },
  '& .MuiInput-underline:hover:before, & .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:after,':
    {
      borderBottom: 'none',
    },
  '.MuiInput-input': {
    padding: '0px',
    color: 'var(--neutral-primary-light)',
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  '.MuiInput-root:hover:not(.Mui-disabled):before ': {
    borderBottom: 'none',
  },
});
export const StyledBox = styled(Box)({
  '& .error-date-picker': {
    border: '1px solid var(--negative-primary)',
  },
});
