import Content from './Content';
import Header from '../components/header';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import '../scss/global.scss';

import {
  StyledContainer,
  ContentWrapper,
  StyledCircularProgress,
  StyledMainBlock,
} from './layout.styles';
import { useCallback, useEffect, useState, useContext } from 'react';
import { Axios } from '../services/_axios';
import { LayoutContext } from './../providers/context/LayoutContext';
import { LOCAL_STORAGE_KEYS } from '../constants/appConstants';
import { setLocalStorageItem } from '../utils/helper-functions/user';

const Layout = () => {
  const {
    layoutData: { header, isClientIntake },
    updateLayout,
  } = useContext(LayoutContext);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, logout, user } = useAuth0();

  const getToken = useCallback(async () => {
    try {
      const getAccessToken = async () => {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        Axios.token = token;
        updateLayout?.({ token });
        return token;
      };
      Axios.getAccessToken = getAccessToken;
      await getAccessToken();
      setLoading(false);
    } catch (error) {
      localStorage.clear();
      logout();
    }
  }, [getAccessTokenSilently, logout]);

  useEffect(() => {
    if (!isClientIntake) {
      getToken();
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      for (const [key, value] of Object.entries(user)) {
        if (key.indexOf('user_metadata') > 0) {
          setLocalStorageItem(
            LOCAL_STORAGE_KEYS.LOGGED_IN_STAFF_BOULEVARD_ID,
            value['boulevard_id']
          );
          setLocalStorageItem(
            LOCAL_STORAGE_KEYS.LOGGED_IN_STAFF_STAFF_ID,
            value['staff_id']
          );
        }
      }
    }
  }, [user]);

  if (loading) {
    return <StyledCircularProgress className='loader' />;
  }

  return (
    <StyledMainBlock>
      {/* container for maintaing ipad resolution as maxwidth */}
      {header ? (
        <>
          <Header />
          <StyledContainer className='main-container' maxWidth='lg'>
            <ContentWrapper>
              <Content />
            </ContentWrapper>
          </StyledContainer>
        </>
      ) : (
        <Content />
      )}
    </StyledMainBlock>
  );
};

export default withAuthenticationRequired(Layout, {
  //will add loading component later
  onRedirecting: () => <StyledCircularProgress className='loader' />,
});
