import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface TextFieldProps {
  isDisabled?: boolean;
}

export const StyledTextField = styled(TextField)((props: TextFieldProps) => ({
  marginTop: '16px',
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  input: {
    '&::placeholder': {
      color: 'var(--neutral-primary-light)',
      fontSize: '16px',
      fontFamily: 'Cadiz',
      fontWeight: 400,
    },
  },
  '&.custom-styled': {
    backgroundColor: props.isDisabled ? 'var(--neutral-secondary-darker)' : '',
    borderRadius: '8px',
    border: '1px solid var(--neutral-secondary-darker)',
    padding: '10px 20px',
  },
  '& label.Mui-focused': {
    top: '10px',
    left: '20px',
    textTransform: 'uppercase',
    color: 'var(--neutral-primary-light)',
  },
  '& .MuiInput-underline:hover:before, & .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:after':
    {
      borderBottom: 'none !important',
    },
  '& label.Mui-disabled': {
    top: '2px',
    left: '20px',
  },
  '.Mui-disabled:before': {
    borderBottomStyle: 'none',
  },
}));
