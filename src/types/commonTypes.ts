import { FC } from 'react';
import { match } from 'react-router-dom';

export interface TMembership{
isMembership?:boolean;
}
export interface TRoute {
  path: string;
  exact: boolean;
  name: string;
  component: FC<TMembership>;
  default?: boolean;
  provider?: FC;
  empty?: boolean;
  props?:TMembership;
}
export type TBreadcrumb = {
  link: string;
  pathName: string;
};
export type BreadCrumbLinkProps = {
  isParent: boolean;
};
export type Location = {
  label: string;
  lat: string;
  lang: string;
};

export type layoutTypes = {
  header?: boolean;
  isClientIntake?: match | boolean | null;
  token?: string;
};
