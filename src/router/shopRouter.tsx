import { AuthProvider } from '../providers/auth0Provider';
import { FC } from 'react';
import Layout from '../containers/Layout';

const ShopAppRouter: FC = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export default ShopAppRouter;
