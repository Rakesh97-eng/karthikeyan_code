import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import CustomerDetailsProvider from '../../providers/context/IntakeClientContext';
import { TRoute } from '../../types/commonTypes';

const Login = React.lazy(() => import('../intake/intake-login'));
const SignUp = React.lazy(() => import('../intake/intake-sign-up'));
const Forgot = React.lazy(() => import('../intake/intake-forgot'));
const MemberShipAgreement = React.lazy(() => import('./index'));
const MemberShipAgreementSuccess = React.lazy(() => import('./successScreen'));
const ForgotSuccess = React.lazy(
  () => import('../intake/intake-forgot/intakeForgotSuccess')
);

import { LayoutContext } from './../../providers/context/LayoutContext';

const routes: TRoute[] = [
  {
    path: '/welcome',
    exact: true,
    name: 'membership-welcome',
    component: MemberShipAgreement,
  },
  {
    path: '/success',
    exact: true,
    name: 'membership-welcome',
    component: MemberShipAgreementSuccess,
  },
  {
    path: '/login',
    exact: true,
    name: 'membership-login',
    component: Login,
    default: true,
    props: { isMembership: true },
  },
  {
    path: '/signup',
    exact: true,
    name: 'membership-sign-up',
    component: SignUp,
    props: { isMembership: true },
  },
  {
    path: '/forgot',
    exact: true,
    name: 'membership-forgot',
    component: Forgot,
    props: { isMembership: true },
  },
  {
    path: '/forgot-success',
    exact: true,
    name: 'membership-forgot-success',
    component: ForgotSuccess,
    props: { isMembership: true },
  },
];

const MembershipRouter = () => {
  const { updateLayout } = useContext(LayoutContext);
  const { path } = useRouteMatch();
  const defaultRoute = routes.find((route) => route.default);

  useEffect(() => {
    updateLayout?.({
      header: false,
    });
    return () => {
      updateLayout?.({
        header: true,
      });
    };
  }, []);

  return (
    <div>
      <CustomerDetailsProvider>
        <Switch>
          {routes.map((route: TRoute) => {
            return (
              <Route
                key={`path-${route.name}`}
                path={`${path}${route.path}`}
                exact={route.exact}
                // eslint-disable-next-line react/no-children-prop
                children={() => {
                  return (
                    <>
                      {route?.provider ? (
                        <route.provider>
                          <route.component {...route.props} />
                        </route.provider>
                      ) : (
                        <route.component {...route.props} />
                      )}
                    </>
                  );
                }}
              />
            );
          })}
          {defaultRoute ? (
            <Route key={`redirect`}>
              <Redirect to={{ pathname: `${path}${defaultRoute.path}` }} />
            </Route>
          ) : null}
        </Switch>
      </CustomerDetailsProvider>
    </div>
  );
};

export default MembershipRouter;
