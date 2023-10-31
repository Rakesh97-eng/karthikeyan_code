import { FC } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

export const AuthProvider: FC = ({ children }) => {
  return (
    <Auth0Provider
      domain={
        process.env.REACT_APP_AUTH0_DOMAIN
          ? process.env.REACT_APP_AUTH0_DOMAIN
          : ''
      }
      clientId={
        process.env.REACT_APP_AUTH0_CLIENT_ID
          ? process.env.REACT_APP_AUTH0_CLIENT_ID
          : ''
      }
      redirectUri={
        process.env.REACT_APP_AUTH_REDIRECT_URL
          ? process.env.REACT_APP_AUTH_REDIRECT_URL
          : ''
      }
      audience={
        process.env.REACT_APP_AUTH0_AUDIENCE
          ? process.env.REACT_APP_AUTH0_AUDIENCE
          : ''
      }
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};
