import {
    TRAVEL_TIPS_ACCOMMODATION,
    TRAVEL_TIPS_CHEAP_EATS,
    TRAVEL_TIPS_CHILDREN_ATTRACTIONS,
    TRAVEL_TIPS_CITY_ATTRACTION,
    TRAVEL_TIPS_DESCRIPTION,
    TRAVEL_TIPS_EVENTS_FESTIVALS,
    TRAVEL_TIPS_ROUTES_FROM_CITY_NAME,
    TRAVEL_TIPS_TRANSPORTATIONS
} from "../../trip_search/domain/entites/utils/constants/constants";

export const buttonDataTravelTips = [
    { text: 'Description', to: TRAVEL_TIPS_DESCRIPTION },
    { text: 'Accommodation', to: TRAVEL_TIPS_ACCOMMODATION },
    { text: 'Events & festivals', to: TRAVEL_TIPS_EVENTS_FESTIVALS },
    { text: 'City attractions', to: TRAVEL_TIPS_CITY_ATTRACTION },
    { text: 'Cheap eats', to: TRAVEL_TIPS_CHEAP_EATS },
    { text: 'Children attractions', to: TRAVEL_TIPS_CHILDREN_ATTRACTIONS },
    { text: 'Transportations', to: TRAVEL_TIPS_TRANSPORTATIONS },
    { text: 'Routes from CITY_NAME', to: TRAVEL_TIPS_ROUTES_FROM_CITY_NAME },
];