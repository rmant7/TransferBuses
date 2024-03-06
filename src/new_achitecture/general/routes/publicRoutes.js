import {MainPage, PassengerPage, BusPage, CarrierPage, TransferPage} from "../../modules";
import TransferViewComponent
    from "../../modules/transfer/presentation/transferPage/transferCard/transferView/TransferViewComponent";
import {Contacts} from "../../modules/contacts/presentation/pages";

import {
    MAIN_ROUTE,
    PASSENGER_ROUTE,
    BUS_ROUTE,
    DRIVER_ROUTE,
    TRANSFER_ROUTE,
    CONTACTS_ROUTE,
    TRAVEL_TIPS,
    TRAVEL_TIPS_DESCRIPTION,
    TRAVEL_TIPS_ACCOMMODATION,
    TRAVEL_TIPS_EVENTS_FESTIVALS,
    TRAVEL_TIPS_CHEAP_EATS,
    TRAVEL_TIPS_CHILDREN_ATTRACTIONS,
    TRAVEL_TIPS_TRANSPORTATIONS,
    TRAVEL_TIPS_ROUTES_FROM_CITY_NAME,
} from "../../modules/trip_search/domain/entites/utils/constants/constants";
import {MainPageComponent} from "../../modules/mainPage/presentation/components/MainPageComponent/MainPageComponent";
import FooterComponent from "../../modules/budgetTravelTips/FooterComponent/FooterComponent";
import TipsComponent from "../../modules/budgetTravelTips/TipsComponent/TipsComponent";
import DescriptionComponent from "../../modules/budgetTravelTips/DescriptionComponent/DescriptionComponent";


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
        path: TRAVEL_TIPS,
        Component: FooterComponent,
    },
    {
        path: TRAVEL_TIPS_DESCRIPTION,
        Component: DescriptionComponent,
    },
    {
        path: TRAVEL_TIPS_ACCOMMODATION,
        Component: TipsComponent,
    },
];
