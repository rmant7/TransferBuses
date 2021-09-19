import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './redusers-combiner';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
