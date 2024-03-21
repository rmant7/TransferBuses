import { createSlice } from '@reduxjs/toolkit';
import { SORT_OPTIONS } from '../../../../domain/entites/utils/constants/sortConstants';

const cheapTripSearchSlice = createSlice({
  name: 'cheapTripSearch',
  initialState: { filterBy: SORT_OPTIONS[0], filteredRoutes: null },
  reducers: {
    setFilter(state, { payload }) {
      state.filterBy = payload;
    },
    setFilteredRoutes(state, { payload }) {
      state.filteredRoutes = payload;
    },
  },
});
const { actions, reducer } = cheapTripSearchSlice;

export const { setFilter, setFilteredRoutes } = actions;

export default reducer;
