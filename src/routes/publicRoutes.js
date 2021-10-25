import { MainPage, PassengerPage, BusPage, CarrierPage, TransferPage } from "../components";
import TransferViewComponent from "../components/future/TransferCard/TransferView/TransferViewComponent";
import { Contacts } from "../pages";
import {
  ADD_TRANSFER_ROUTE,
  BUS_ROUTE,
  CONTACTS_ROUTE,
  MAIN_ROUTE,
  TRANSFERS_ROUTE,
  TRANSFER_ROUTE,
} from "../utils/constants";

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: `${TRANSFERS_ROUTE}/:id`,
    Component: TransferViewComponent,
  },
  {
    path: TRANSFERS_ROUTE,
    Component: PassengerPage,
  },
  {
    path: BUS_ROUTE,
    Component: BusPage,
  },
  {
    path: ADD_TRANSFER_ROUTE,
    Component: CarrierPage,
  },
  {
    path: TRANSFER_ROUTE,
    Component: TransferPage,
  },
  {
    path: CONTACTS_ROUTE,
    Component: Contacts,
  },
];
