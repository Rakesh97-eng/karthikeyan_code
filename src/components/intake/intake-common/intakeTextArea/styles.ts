import { styled } from '@mui/material/styles';
import { Box, TextField, Checkbox } from '@mui/material';
interface TextFieldProps {
  isDisabled: boolean;
  error?: boolean;
}
interface CheckBoxFieldProps {
  checked?: boolean;
}

export const StyledTextField = styled(TextField)((props: TextFieldProps) => ({
  marginTop: '16px',
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  '&.custom-styled': {
    backgroundColor: props.isDisabled
      ? 'var(--neutral-secondary-darker)'
      : 'var(--neutral-secondary)',
    borderRadius: '8px',
    border: props.error
      ? '1px solid var(--negative-primary)'
      : '1px solid var(--neutral-secondary-darker)',
    padding: '20px',
  },

  '.MuiInput-input': {
    padding: '0px',
    color: 'var(--neutral-primary-light)',
    fontWeight: '400',
  },
  '& label.Mui-focused': {
    top: '10px',
    left: '20px',
    textTransform: 'uppercase',
    color: 'var(--neutral-primary-light)',
  },
  '& .MuiInput-underline:hover:before, & .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:after':
    {
      borderBottom: 'none',
    },
  '& label.Mui-disabled': {
    top: '2px',
    left: '20px',
  },
  '.Mui-disabled:before': {
    borderBottomStyle: 'none',
  },
}));

export const StyledBox = styled(Box)({
  '.check-box-wrapper': {
    display: 'flex',
    gap: '10px',
    marginTop: '16px',
    alignItems: 'flex-start',
    marginBottom: '4px',
    color: 'var(--neutral-primary)',
    '.check-box': {
      width: '20px',
      height: '20px',
      left: '2px',
      top: '2px',
      borderRadius: '2px',
    },
    '.MuiCheckbox-root': {
      padding: '0px',
    },
  },
});

export const StyledCheckBox = styled(Checkbox)((props: CheckBoxFieldProps) => ({
  border: !props.checked ? `1px solid var(--neutral-primary)` : 'none',
  '.MuiSvgIcon-root': {
    display: props.checked ? 'block' : 'none',
  },
}));
