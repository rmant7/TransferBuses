import { MainPage, PassengerPage, BusPage, CarrierPage, TransferPage } from "../../modules";
import TransferViewComponent from "../../modules/transfer/presentation/transferPage/transferCard/transferView/TransferViewComponent";


import {
  MAIN_ROUTE,
  PASSENGER_ROUTE,
  BUS_ROUTE,
  DRIVER_ROUTE,
  TRANSFER_ROUTE,
  CONTACTS_ROUTE,
  READ_MORE_ROUTE, TIPS_MAIN
} from "../../modules/trip_search/domain/entites/utils/constants/constants";
import {MainPageComponent} from "../../modules/mainPage/presentation/components/MainPageComponent/MainPageComponent";
import {readMore} from "../../modules/trip_search/presentation/components/readMore/readMore";
import BudgetTravelTips from "../../modules/BudjetTrevelTips/BudgetTravelTips";
import {Contacts} from "../../modules/contacts/presentation/pages";

export const publicRoutes = [
  // {
  //   path: MAIN_ROUTE,
  //   Component: mainPage,
  // },
  {
    path: MAIN_ROUTE,
    Component: MainPageComponent,
  },
  {
    path: `${PASSENGER_ROUTE}/:trip`,
    Component: TransferViewComponent,
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
  {
    path: READ_MORE_ROUTE,
    Component: readMore,
  },
  {
    path: TIPS_MAIN,
    Component: BudgetTravelTips
  }
];

export const PAGES_WITH_MUI_HEADER = [
  CONTACTS_ROUTE, TRANSFER_ROUTE, DRIVER_ROUTE,
  BUS_ROUTE, PASSENGER_ROUTE, MAIN_ROUTE
]
