import { ListItem, ListItemText } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { user, logout } = useAuth0();
  return (
    <header>
      <ListItemText inset primary={user?.nickname} />
      <ListItem
        button
        component='a'
        onClick={() => {
          localStorage.clear();
          logout({ returnTo: window.location.origin })
        }}
      >
        <span>Logout</span>
      </ListItem>
    </header>
  );
};

export default Header;
