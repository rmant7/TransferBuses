import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './redusers-combiner';
import {configureStore} from "@reduxjs/toolkit";

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = configureStore({reducer: rootReducer});
