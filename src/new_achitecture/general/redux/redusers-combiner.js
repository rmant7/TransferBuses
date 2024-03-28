import { combineReducers } from 'redux';
import appReducer from './slices/appSettingsSlice';
import inputFromToCityReducer from '../../modules/trip_search/presentation/redux/slices/inputSlice';
import loadingReducer from '../../modules/trip_search/presentation/redux/slices/loadingSlice';
import transfersReducer from '../../modules/trip_search/presentation/redux/slices/transferSlice';
import cheapTripSearch from '../../modules/trip_search/presentation/redux/reducers/cheapTripSearch/cheapTripSearchSlice';
import playStoreModal from './../redux/slices/playStoreModalSlice';

export const rootReducer = combineReducers({
  app: appReducer,
  transfers: transfersReducer,
  inputFromToCity: inputFromToCityReducer,
  loading: loadingReducer,
  cheapTripSearch,
  playStoreModal,
});
