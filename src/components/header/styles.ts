import { AppBar, styled, Theme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { StyledContainer } from '../../containers/layout.styles';

export const HeaderAppBar = styled(AppBar)({
  backgroundColor: 'var(--neutral-secondary)',
  boxShadow: '1px 1px 4px var(--box-shadow)',
  color: 'var(--neutral-primary)',
});

export const HeaderImg = styled('img')({
  height: '32px',
  margin: '0 auto',
});

export const Navbar = styled('nav')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexGrow: 1,
  flexBasis: 0,
  [`${theme?.breakpoints.down('lg')}`]: {
    padding: '0 16px',
  },
  '.navMenu-icon': {
    display: 'none',
    cursor: 'pointer',
    [`${theme?.breakpoints.down('lg')}`]: {
      display: 'block',
    },
  },
}));
export const Navlink = styled(NavLink)(({ theme }: { theme: Theme }) => ({
  display: 'inline-block',
  cursor: 'pointer',
  margin: '0 16px',
  textDecoration: 'unset',
  color: 'unset',
  '&.active': {
    borderBottom: '1px solid',
  },
  [`${theme?.breakpoints.down('lg')}`]: {
    display: 'none',
  },
}));
export const FlexContainer = styled(StyledContainer)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 'inherit',
});
export const LogoWrapper = styled('div')({
  margin: '0 auto',
});
export const ProfileCircle = styled('div')({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '40px',
  backgroundColor: 'var(--neutral-primary)',
  color: 'var(--neutral-secondary)',
  cursor: 'pointer',
});
export const ProfileWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexGrow: 1,
  flexBasis: 0,
  [`${theme?.breakpoints.down('lg')}`]: {
    padding: '0 4px',
  },
}));
