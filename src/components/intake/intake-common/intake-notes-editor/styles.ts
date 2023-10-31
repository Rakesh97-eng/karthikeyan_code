import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const NoteEditorWrapper = styled(Box)({
  borderTop: '1px solid var(--neutral-secondary-dark)',
  margin: '12px 0 8px 0',
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
        backgroundColor: 'var(--neutral-secondary)',
      },
      '&.rdw-option-active': {
        backgroundColor: 'var(--neutral-secondary)',
      },
    },
  },
  '.character-count': {
    color: '--var(--neutral-primary)',
  },
  '.MuiFilledInput-root': {
    backgroundColor: 'var(--neutral-secondary)',
    padding: '25px 12px 8px 0px',
  },
});

export const CharacterCountWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  '.character-count-text': {
    margin: '4px 12px 12px 0px',
    textTransform: 'uppercase',
    color: 'var(--neutral-primary-light)',
    letterSpacing: '0.03em',
  },
});

export const StyledTextArea = styled(TextField)({
  color: 'var(--neutral-primary)',
  backgroundColor: 'var(--neutral-secondary)',
  '& .MuiFilledInput-root': {
    color: 'var(--neutral-primary)',
  },
  '& .MuiFilledInput-root:hover': {
    backgroundColor: 'var(--neutral-secondary)',
    borderBottom: '1px solid var(--neutral-secondary-darker)',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:focus': {
    backgroundColor: 'var(--neutral-secondary)',
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
  '&:after': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
  '& .MuiFilledInput-root:before': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
  '.MuiFilledInput-root:hover:not(.Mui-disabled):before ': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
  '.MuiFilledInput-root:after': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: 'var(--neutral-primary-light)',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '0.03em',
  },
  '.MuiInputLabel-root': {
    color: 'var(--neutral-primary-light)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    fontSize: '12px',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
  },
});

export const NotesContainer = styled('div')({
  display: 'flex',
  gap: '10px',
  marginTop: '16px',
});
