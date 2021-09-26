import { combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import { filtersReducer, selectFilterReducer } from "./reducers/filtersReducer";
import { fromCityTransfersReducer, transfersReducer } from "./reducers/transfersReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    transfersData: transfersReducer,
    fromCityTransfersData: fromCityTransfersReducer,
    filters: filtersReducer,
    selectFilter: selectFilterReducer
});