import { Menu, styled } from '@mui/material';
export type MenuStyledProps = {
  open: boolean;
};
export const LocationMenu = styled(Menu)({
  '&.location-dropdown-menu .MuiPaper-root': {
    marginLeft: '-12px',
    width: 'fit-content',
    marginTop: '40px',
    borderRadius: '8px',
  },
  '&.location-dropdown-menu .MuiMenu-list': {
    color: 'var(--neutral-primary)',
    borderRadius: '8px',
    padding: '0',
    height: '250px',
    overflowY: 'auto',
    '.location-dropdown-menu-item': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 16px',
      '.checkmark-icon': {
        marginLeft: '16px',
      },
    },
  },
});
export const LocationMenuWrapper = styled('div')((props: MenuStyledProps) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: props.open ? 'var(--neutral-tertiary-dark)' : 'unset',
  borderRadius: '8px',
  color: 'var(--neutral-primary)',
  padding: props.open ? '8px 10px' : '8px 0',
  width: 'fit-content',
  marginBottom: '16px',
  '.location-dropdown-btn': {
    padding: '0',
    color: 'var(--neutral-primary)',
    textTransform: 'none',
  },
  '.expand-icon-wrapper': {
    display: 'flex',
    marginLeft: '7px',
  },
  '.mapPin': {
    marginRight: '6px',
  },
}));
