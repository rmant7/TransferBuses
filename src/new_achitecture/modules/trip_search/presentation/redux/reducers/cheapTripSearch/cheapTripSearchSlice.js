import { createSlice } from '@reduxjs/toolkit';
import { SORT_OPTIONS } from '../../../../domain/entites/utils/constants/sortConstants';

const cheapTripSearchSlice = createSlice({
  name: 'cheapTripSearch',
  initialState: { filterBy: SORT_OPTIONS[0] },
  reducers: {
    setFilter(state, { payload }) {
      state.filterBy = payload;
    },
  },
});
const { actions, reducer } = cheapTripSearchSlice;

export const { setFilter } = actions;

export default reducer;
