import { MainPage, PassengerPage, BusPage, CarrierPage, TransferPage } from "../components";
import FiltersComponent from "../components/future/Filters/FiltersComponent";
import TripViewComponent from "../components/future/TripCard/TripView/TripViewComponent";
import { Contacts } from "../pages";
import {
  TRANSFERS_ADD_TRANSFER_PATH,
  BUS_PATH,
  CONTACTS_PATH,
  MAIN_PATH,
  TRANSFERS_PATH,
  TRANSFERS_SEARCH_PATH,
} from "../utils/constants";

export const publicRoutes = [
  {
    path: MAIN_PATH,
    Component: MainPage,
  },
  {
    path: TRANSFERS_SEARCH_PATH,
    Component: FiltersComponent,
  },
  // {
  //   path: TRANSFERS_ADD_TRANSFER_PATH,
  //   Component: CarrierPage,
  // },
  {
    path: TRANSFERS_PATH,
    Component: PassengerPage,
  },
  {
    path: `${TRANSFERS_PATH}/:id`,
    Component: TripViewComponent,
  },
  {
    path: BUS_PATH,
    Component: BusPage,
  },
  // {
  //   path: TRANSFER_PATH,
  //   // Component: TransferPage,
  //   Component: TripViewComponent,
  // },
  {
    path: CONTACTS_PATH,
    Component: Contacts,
  },
];
