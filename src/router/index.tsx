import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loader } from '../components/common/Loader';
import IntakeRouter from '../components/intake';
import MemberShipRouter from '../components/membership/membershipRouter';
import { MEMBERSHIP_ROUTE } from '../constants/Helpers';
import { INTAKE_ROUTE } from '../constants/intakeConstants';
import ShopAppRouter from './shopRouter';

export const Router = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path={MEMBERSHIP_ROUTE} component={MemberShipRouter} />
        <Route path={INTAKE_ROUTE} component={IntakeRouter} />
        <Route path='/' component={ShopAppRouter} />
      </Switch>
    </React.Suspense>
  );
};
