import { Menu } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledNote = styled('span')(() => ({
  color: 'var(--neutral-primary-light)',
  fontStyle: 'italic',
  marginLeft: '5px',
  fontSize: '14px',
}));
export const StyledMandatory = styled('span')(() => ({
  color: 'var(--negative-primary)',
  fontSize: '16px',
}));
export const StyledOptional = styled('span')(() => ({
  color: 'var(--neutral-primary-light)',
  fontStyle: 'italic',
  margin: '0 5px',
}));
export const MenuWrapper = styled(Menu)({
  '.MuiPaper-root': {
    borderRadius: '8px',
  },
  '.single-btn': {
    display: 'block',
  },
  '& .MuiMenu-list': {
    borderRadius: '8px',
    padding: '0',
    ['& .MuiButtonBase-root']: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 16px',
      ['& .menu-icon']: {
        marginRight: '16px',
      },
    },
  },
});
