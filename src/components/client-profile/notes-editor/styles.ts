import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const NoteEditorWrapper = styled(Box)({
  '.note-editor': {
    border: '1px solid var(--neutral-secondary-darker)',
    borderRadius: '4px',
    '.public-DraftStyleDefault-block, .public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul':
      {
        margin: '0',
        padding: '8px',
      },
    '&:focus-within': {
      border: '1px solid var(--accent-primary)',
    },
  },
  '.note-toolbar': {
    padding: '4px 0',
    border: 'none',
    '.rdw-option-wrapper': {
      border: 'none',
      img: {
        width: '16px',
        height: '16px',
      },
      '&:hover, &:active, &.rdw-option-active': {
        boxShadow: 'none',
      },
      '&:active': {
        backgroundColor: 'var(--neutral-secondary-dark)',
      },
      '&.rdw-option-active': {
        backgroundColor: 'var(--neutral-secondary-darker)',
      },
    },
  },
  '.character-count': {
    color: '--var(--neutral-primary)',
  },
});

export const CharacterCountWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0 16px',
  '.character-count-text': {
    color: 'var(--neutral-primary-light)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },
});

export const StyledTextArea = styled(TextField)({
  color: 'var(--neutral-primary)',
  '& .MuiFilledInput-root': {
    backgroundColor: 'transparent',
    border: '1px solid var(--neutral-secondary-darker)',
    borderRadius: '8px',
    padding: '10px 12px 8px',
  },
  '&.MuiTextField-root': {
    padding: '10px 12px 8px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:hover': {
    backgroundColor: 'transparent',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:focus': {
    backgroundColor: 'transparent',
    borderBottom: 'none',
    border: '1px solid var(--accent-primary)',
  },
  '&:after': {
    borderBottom: 'none',
  },
  '& .MuiFilledInput-root:before': {
    borderBottom: 'none',
  },
  '.MuiFilledInput-root:hover:not(.Mui-disabled):before ': {
    borderBottom: 'none',
  },
  '.MuiFilledInput-root:after': {
    borderBottom: 'none',
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: 'var(--neutral-primary)',
    textTransform: 'uppercase',
    left: '5px',
    top: '-12px',
  },
  '.MuiInputLabel-root': {
    color: 'var(--neutral-primary)',
    textTransform: 'uppercase',
    left: 'auto',
    top: '5px',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--neutral-secondary-darker)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid var(--accent-primary)',
  },
});
