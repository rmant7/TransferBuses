const SET_SIDEBAR = 'SHOW_SIDEBAR';

const defaultState = {
  sidebar: false,
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sidebar: action.payload };

    default:
      return state;
  }
}

export const setSidebar = (payload) => ({ type: SET_SIDEBAR, payload: payload });
