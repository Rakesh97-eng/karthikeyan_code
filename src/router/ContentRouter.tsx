import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Loader } from '../components/common/Loader';
import routes from './routes';

export const ContentRouter = () => {
  const defaultRoute = routes.find((route) => route?.default);
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => {
          return (
            <Route
              key={idx}
              path={route.path}
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
            <Redirect to={{ pathname: `${defaultRoute.path}` }} />
          </Route>
        ) : null}
      </Switch>
    </Suspense>
  );
};
