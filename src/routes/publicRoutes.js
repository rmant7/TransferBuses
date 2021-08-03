import { MainPage, PassengerPage, BusPage, DriverPage, TransferPage } from '../components';
import { AboutUs, Contacts, Services } from '../pages';
import {
  MAIN_ROUTE,
  PASSENGER_ROUTE,
  BUS_ROUTE,
  DRIVER_ROUTE,
  TRANSFER_ROUTE,
  CONTACTS_ROUTE,
  ABOUT_ROUTE,
  SERVICES_ROUTE,
} from '../utils/constants';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: PASSENGER_ROUTE,
    Component: PassengerPage,
  },
  {
    path: BUS_ROUTE,
    Component: BusPage,
  },
  {
    path: DRIVER_ROUTE,
    Component: DriverPage,
  },
  {
    path: TRANSFER_ROUTE,
    Component: TransferPage,
  },
  {
    path: ABOUT_ROUTE,
    Component: AboutUs,
  },
  {
    path: CONTACTS_ROUTE,
    Component: Contacts,
  },
  {
    path: SERVICES_ROUTE,
    Component: Services,
  },
];
