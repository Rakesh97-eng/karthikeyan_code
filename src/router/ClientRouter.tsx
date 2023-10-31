import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import ClientStateProvider from '../store/client/ClientStateProvider';
import { TRoute } from '../types/commonTypes';
const Clients = React.lazy(() => import('./pages/Clients'));
const ClientDetailRouter = React.lazy(() => import('./clientDetailRouter'));
const routes: TRoute[] = [
  {
    path: '/',
    exact: true,
    name: 'Clients',
    component: Clients,
  },
  {
    path: '/:clientID',
    // {exact} needs to be false for nested routing
    exact: false,
    name: 'Clients',
    component: ClientDetailRouter,
  },
];

const ClientRouter = () => {
  const { path } = useRouteMatch();
  const defaultRoute = routes.find((route) => route.default);
  return (
    <div>
      <ClientStateProvider>
        <Switch>
          {routes.map((route: TRoute, idx: number) => {
            return (
              <Route
                key={`path-${idx}`}
                path={`${path}${route.path}`}
                exact={route.exact}
                // eslint-disable-next-line react/no-children-prop
                children={() => {
                  return (
                    <>
                      {route?.provider ? (
                        <route.provider>
                          <route.component />
                        </route.provider>
                      ) : (
                        <route.component />
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
      </ClientStateProvider>
    </div>
  );
};

export default ClientRouter;
