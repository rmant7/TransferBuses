import { combineReducers } from "redux";
import appReducer from "./reducers/app-reducer";
import { filtersReducer, selectFilterReducer } from "./reducers/filters-reducer";
import { inputFromToCityReducer } from "./reducers/inputs-reducer";
import { loadingReducer } from "./reducers/loading-reducer";
import { fromCityTransfersReducer, saveNewTransferReducer, transfersReducer } from "./reducers/transfers-reducer";
import dataReducer from "./reducers/dataSlice";

export const rootReducer = combineReducers({
    app: appReducer,
    transfersData: transfersReducer,
    saveNewTransfer: saveNewTransferReducer,
    fromCityTransfersData: fromCityTransfersReducer,
    filters: filtersReducer,
    selectFilter: selectFilterReducer,
    inputFromToCity: inputFromToCityReducer,
    loading: loadingReducer,
    data: dataReducer,
});