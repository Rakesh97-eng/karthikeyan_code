import { FC, useState, useCallback } from 'react';
import { MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  FlexContainer,
  HeaderAppBar,
  HeaderImg,
  LogoWrapper,
  Navbar,
  Navlink,
  ProfileCircle,
  ProfileWrapper,
} from './styles';
import HeyDayLogo from '../../assets/images/heyday-logo-black.png';
import { ReactComponent as HamburgerMenuIcon } from '../../assets/icons/hamburger.svg';
import { ReactComponent as SignOutIcon } from '../../assets/icons/signOut.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { NAV_LINKS } from '../../constants/headerMenuQuickLinks';
import { MenuWrapper } from '../../styles/global';
import SideBarMenu from '../common/SideBarMenu';

const Header: FC = () => {
  const { user, logout } = useAuth0();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileMenuOpen = Boolean(anchorEl);
  const handleProfileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => setAnchorEl(null);
  const [sideBarStatus, setSideBarStatus] = useState<boolean>(false);

  const handleSideBarOpen = useCallback(() => {
    setSideBarStatus(true);
  }, [sideBarStatus]);

  const handleSidebarClose = useCallback(() => {
    setSideBarStatus(false);
  }, [sideBarStatus]);

  const handleLogoutClick = () => {
    localStorage.clear();
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <SideBarMenu
        sideBarOpen={sideBarStatus}
        closeSidebar={handleSidebarClose}
        openSidebar={handleSideBarOpen}
      />
      <HeaderAppBar position='static'>
        <FlexContainer className='main-container flex' maxWidth='lg'>
          <Navbar>
            {NAV_LINKS.map((nav, index) => (
              <Navlink key={`nav-link-${index}`} to={nav.path}>
                <Typography variant='btn'>{nav.name}</Typography>
              </Navlink>
            ))}
            <HamburgerMenuIcon
              className='navMenu-icon'
              onClick={handleSideBarOpen}
            />
          </Navbar>
          <LogoWrapper>
            <HeaderImg src={HeyDayLogo} />
          </LogoWrapper>
          <ProfileWrapper>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              aria-controls={profileMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={profileMenuOpen ? 'true' : undefined}
              onClick={handleProfileMenuClick}
            >
              <ProfileCircle>
                <Typography
                  variant='body1'
                  className='bold'
                  textTransform={'uppercase'}
                >
                  {user?.nickname?.charAt(0)}
                </Typography>
              </ProfileCircle>
            </IconButton>
          </ProfileWrapper>
          <MenuWrapper
            id='basic-menu'
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogoutClick}>
              <SignOutIcon className='menu-icon' />
              <Typography variant='body1'>Log Out</Typography>
            </MenuItem>
          </MenuWrapper>
        </FlexContainer>
      </HeaderAppBar>
    </>
  );
};

export default Header;
