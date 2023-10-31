import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {
  SideBarMenuHeader,
  SideBarMenuContainer,
  HeaderImg,
  SideBarMenuItems,
  SideBarMenuItem,
  SideBarQuickLinksWrapper,
  QuickLinkList,
  QuickLinkListItem,
  QuickLink,
} from './styles';
import HeyDayLogo from '../../../assets/images/heyday-logo-black.png';
import { ReactComponent as CloseIcon } from '../../../assets/icons/X-icon.svg';
import { Typography, IconButton } from '@mui/material';
import {
  QUICK_LINKS_LIST,
  NAV_LINKS,
} from '../../../constants/headerMenuQuickLinks';
interface Props {
  sideBarOpen: boolean;
  closeSidebar: () => void;
  openSidebar: () => void;
}
const SideBarMenu: FC<Props> = ({ sideBarOpen, closeSidebar, openSidebar }) => {
  const history = useHistory();
  function navigate(path: string) {
    history.push(path);
    closeSidebar();
  }
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={sideBarOpen}
        onClose={closeSidebar}
        onOpen={openSidebar}
        disableSwipeToOpen={false}
        swipeAreaWidth={16}
        disableDiscovery
      >
        <SideBarMenuContainer>
          <SideBarMenuHeader>
            <HeaderImg src={HeyDayLogo} alt='HeyDay Logo' />
            <IconButton onClick={closeSidebar}>
              <CloseIcon />
            </IconButton>
          </SideBarMenuHeader>
          <SideBarMenuItems>
            {NAV_LINKS.map((navItem, index) => {
              return (
                <SideBarMenuItem
                  key={`nav-item-${index}`}
                  onClick={() => navigate(navItem.path)}
                >
                  <img src={navItem?.icon} alt={navItem.name} />
                  <Typography variant='h4'>{navItem.name}</Typography>
                </SideBarMenuItem>
              );
            })}
          </SideBarMenuItems>
          <SideBarQuickLinksWrapper>
            <Typography variant='label' className='quickLinkText'>
              QUICK LINKS
            </Typography>
            <QuickLinkList>
              {QUICK_LINKS_LIST.map((quickLink, index) => {
                return (
                  <QuickLinkListItem key={`quickLink-${index}`}>
                    <QuickLink
                      href={quickLink.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='reset-Link'
                    >
                      <img
                        src={quickLink?.icon}
                        className='quickLink-icon'
                        alt={quickLink.label}
                      />
                      <Typography variant='body1'>{quickLink.label}</Typography>
                    </QuickLink>
                  </QuickLinkListItem>
                );
              })}
            </QuickLinkList>
          </SideBarQuickLinksWrapper>
        </SideBarMenuContainer>
      </SwipeableDrawer>
    </>
  );
};

export default SideBarMenu;
