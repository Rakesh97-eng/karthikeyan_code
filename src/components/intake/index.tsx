import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import CustomerDetailsProvider from '../../providers/context/IntakeClientContext';
import { TRoute } from '../../types/commonTypes';
const IntakeWelcome = React.lazy(() => import('./intake-welcome'));
const IntakeAfterWelcome = React.lazy(
  () => import('./intake-welcome/intakeWelcomeSuccess')
);
const IntakeLogin = React.lazy(() => import('./intake-login'));
const IntakeSignUp = React.lazy(() => import('./intake-sign-up'));
const IntakeForgot = React.lazy(() => import('./intake-forgot'));
const IntakeBasicSection = React.lazy(
  () => import('./intake-section/intakeBasicSection')
);
const IntakeSkinCareSection = React.lazy(
  () => import('./intake-section/intakeSkinCareSection')
);
const IntakeOilActivitySection = React.lazy(
  () => import('./intake-section/intakeOilActivitySection')
);
const IntakeForgotSuccess = React.lazy(
  () => import('./intake-forgot/intakeForgotSuccess')
);
const IntakeSensitiveSection = React.lazy(
  () => import('./intake-section/intakeSensitiveSection')
);

const IntakeDecencyAgreement = React.lazy(
  () => import('./intake-decency-agreement')
);
const IntakeInterstitial = React.lazy(
  () => import('./intake-welcome/intakeInterstitial')
);
const UpdateMessage = React.lazy(
  () => import('./intake-message-screen/updateMessage')
);
const WaitingForConsent = React.lazy(
  () => import('./intake-message-screen/waitingForConsent')
);
const TooYoung = React.lazy(() => import('./intake-message-screen/tooYoung'));

const ResetPassword = React.lazy(() => import('./intake-reset-password'));
import { LayoutContext } from './../../providers/context/LayoutContext';
import IntakeResetSuccess from './intake-reset-password/intakeResetSuccess';

const routes: TRoute[] = [
  {
    path: '/welcome',
    exact: true,
    name: 'Intake-welcome',
    component: IntakeWelcome,
    default: true,
  },
  {
    path: '/login',
    exact: true,
    name: 'Intake-login',
    component: IntakeLogin,
  },
  {
    path: '/signup',
    exact: true,
    name: 'Intake-sign-up',
    component: IntakeSignUp,
  },
  {
    path: '/forgot',
    exact: true,
    name: 'Intake-forgot',
    component: IntakeForgot,
  },
  {
    path: '/forgot-success',
    exact: true,
    name: 'Intake-forgot-success',
    component: IntakeForgotSuccess,
  },
  {
    path: '/intake-welcome',
    exact: true,
    name: 'Intake-welcome',
    component: IntakeAfterWelcome,
  },
  {
    path: '/basic-section',
    exact: true,
    name: 'Intake-basic',
    component: IntakeBasicSection,
  },
  {
    path: '/skincare-section',
    exact: true,
    name: 'Intake-Skincare',
    component: IntakeSkinCareSection,
  },
  {
    path: '/oil-section',
    exact: true,
    name: 'Intake-Oil-Activity',
    component: IntakeOilActivitySection,
  },
  {
    path: '/sensitive-section',
    exact: true,
    name: 'Intake-Oil-Activity',
    component: IntakeSensitiveSection,
  },
  {
    path: '/decency-agreement',
    exact: true,
    name: 'Intake-basic',
    component: IntakeDecencyAgreement,
  },
  {
    path: '/section-success',
    exact: true,
    name: 'Section-Success',
    component: IntakeInterstitial,
  },
  {
    path: '/update-message',
    exact: true,
    name: 'Update-Message',
    component: UpdateMessage,
  },
  {
    path: '/wait-consent',
    exact: true,
    name: 'Waiting-For-Consent',
    component: WaitingForConsent,
  },
  {
    path: '/too-young',
    exact: true,
    name: 'Too-Young',
    component: TooYoung,
  },
  {
    path: '/reset-password/:id/:resetToken',
    exact: true,
    name: 'Reset-Password',
    component: ResetPassword,
  },
  {
    path: '/reset-success',
    exact: true,
    name: 'Reset-success',
    component: IntakeResetSuccess,
  },
];

const IntakeRouter = () => {
  const {
    updateLayout,
    layoutData: { isClientIntake },
  } = useContext(LayoutContext);
  const { path } = useRouteMatch();
  const defaultRoute = isClientIntake
    ? { path: `/welcome` }
    : routes.find((route) => route.default);

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
      </CustomerDetailsProvider>
    </div>
  );
};

export default IntakeRouter;
