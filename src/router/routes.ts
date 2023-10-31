import React from 'react';
import ClientStateProvider from '../store/client/ClientStateProvider';
import { TRoute } from '../types/commonTypes';

const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/products'));
const ClientRouter = React.lazy(() => import('./ClientRouter'));
const IntakeRouter = React.lazy(() => import('./../components/intake'));
const routes: TRoute[] = [
  {
    path: '/home',
    exact: true,
    name: 'Home',
    component: Home,
    default: true,
  },
  {
    path: '/clients',
    // {exact} needs to be false for nested routing
    exact: false,
    name: 'Clients',
    component: ClientRouter,
    provider: ClientStateProvider,
  },
  {
    path: '/products',
    exact: true,
    name: 'Products',
    component: Products,
  },
  {
    path: '/client/intake',
    exact: false,
    name: 'client-Intake',
    component: IntakeRouter,
  },
  {
    path: '/intake',
    exact: false,
    name: 'Intake',
    component: IntakeRouter,
  },
  {
    path: '/shop/intake',
    exact: false,
    name: 'Shop Intake',
    component: IntakeRouter,
  },
  ];

export default routes;
