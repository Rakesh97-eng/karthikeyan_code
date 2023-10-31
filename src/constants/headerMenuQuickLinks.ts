import BookOpen from '../assets/icons/BookOpen.svg';
import HandPalm from '../assets/icons/HandPalm.svg';
import Boulevard from '../assets/icons/Blvd.svg';
import UserIcon from '../assets/icons/user.svg';
import HouseIcon from '../assets/icons/House.svg';
import ProductIcon from '../assets/icons/Product-Icon.svg';
import { ROUTES } from '../router/routesConstant';

export const NAV_LINKS: { path: string; name: string; icon: string }[] = [
  { path: ROUTES.HOME_ROUTE, name: 'Home', icon: HouseIcon },
  { path: ROUTES.CLIENTS_ROUTE, name: 'Clients', icon: UserIcon },
  { path: ROUTES.PRODUCTS_ROUTE, name: 'Products', icon: ProductIcon },
];
export const QUICK_LINKS_LIST = [
  {
    title: 'Boulevard',
    label: 'Boulevard',
    url: 'https://dashboard.boulevard.io/login',
    icon: Boulevard,
  },
  {
    title: 'Prospr',
    label: 'Prospr',
    url: 'https://app.prospr.work/login',
    icon: HandPalm,
  },
  {
    title: 'The Thread',
    label: 'The Thread',
    url: 'https://thethread.heydayskincare.com/learn',
    icon: BookOpen,
  },
];
