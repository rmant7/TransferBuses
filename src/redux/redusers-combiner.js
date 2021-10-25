import { combineReducers } from "redux";
import appReducer from "./reducers/app-reducer";
import { filtersReducer } from "./reducers/filters-reducer";
import { loadingReducer } from "./reducers/loading-reducer";
import { saveNewTransferReducer } from "./reducers/transfer-upload-reducer";
import { transfersReducer } from "./reducers/transfers-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    transfers: transfersReducer,
    saveNewTransfer: saveNewTransferReducer,
    filters: filtersReducer,
    loading: loadingReducer
});