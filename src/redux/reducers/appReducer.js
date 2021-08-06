const SET_SIDEBAR = 'SHOW_SIDEBAR';
const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_CURRENCY = 'SET_CURRENCY';

const defaultState = {
  sidebar: false,
  lang: 'en',
  currency: 'EUR',
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sidebar: action.payload };
    case SET_LANGUAGE:
      return { ...state, lang: action.payload };
    case SET_CURRENCY:
      return { ...state, currency: action.payload };

    default:
      return state;
  }
}

export const setSidebar = (payload) => ({ type: SET_SIDEBAR, payload: payload });
export const setLanguage = (payload) => ({ type: SET_LANGUAGE, payload });
export const setCurrency = (payload) => ({ type: SET_CURRENCY, payload });
