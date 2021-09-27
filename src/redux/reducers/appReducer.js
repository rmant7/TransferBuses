export const SET_SIDEBAR = 'SHOW_SIDEBAR';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_CURRENCY = 'SET_CURRENCY';

const defaultState = {
  sidebar: false,
  lang: localStorage.getItem("locale") || "en",
  currency: localStorage.getItem("currency") || 'EUR',
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
