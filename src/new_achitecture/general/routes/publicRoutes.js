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
    TRAVEL_TIPS_CITY_ATTRACTION, TRAVEL_TIPS_ACCOMMODATION_READ_MORE,
} from "../../modules/trip_search/domain/entites/utils/constants/constants";
import {MainPageComponent} from "../../modules/mainPage/presentation/components/MainPageComponent/MainPageComponent";
import BudgetTravelTipsStartPage from "../../modules/budgetTravelTips/pages/BudgetTravelTipsStartPage";
import CityDescriptionPage from "../../modules/budgetTravelTips/pages/CityDescriptionPage";
import AccommodationsPage from "../../modules/budgetTravelTips/pages/AccommodationsPage";
import ReadMorePage from "../../modules/budgetTravelTips/pages/ReadMorePage";

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
    //BUDGET TRAVEL TIPS
    {
        path: TRAVEL_TIPS,
        Component: BudgetTravelTipsStartPage,
    },
    {
        path: `${TRAVEL_TIPS_DESCRIPTION}/:cityId`,
        Component: CityDescriptionPage,
    },
    {
        path: TRAVEL_TIPS_ACCOMMODATION,
        Component: AccommodationsPage,
    },
    {
        path: TRAVEL_TIPS_EVENTS_FESTIVALS,
        Component: AccommodationsPage,
    },
    {
        path: TRAVEL_TIPS_CITY_ATTRACTION,
        Component: AccommodationsPage,
    },
    {
        path: TRAVEL_TIPS_CHEAP_EATS,
        Component: AccommodationsPage,
    },
    {
        path: TRAVEL_TIPS_CHILDREN_ATTRACTIONS,
        Component: AccommodationsPage,
    },
    {
        path: TRAVEL_TIPS_TRANSPORTATIONS,
        Component: AccommodationsPage,
    },
    {
        path: TRAVEL_TIPS_ROUTES_FROM_CITY_NAME,
        Component: AccommodationsPage,
    },

    //BUDGET TRAVEL TIPS_READ_MORE
    {
        path: TRAVEL_TIPS_ACCOMMODATION_READ_MORE,
        Component: ReadMorePage,
    },

];
