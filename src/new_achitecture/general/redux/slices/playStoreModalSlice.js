import { createSlice } from '@reduxjs/toolkit';

const playStoreModalSlice = createSlice({
  name: 'playStore',
  initialState: {
    open: sessionStorage.getItem('playstoreModal')
      ? sessionStorage.getItem('playstoreModal')
      : true,
  },
  reducers: {
    closeModal: (state) => {
      sessionStorage.setItem('playstoreModal', false);
      return { ...state, open: false };
    },
  },
});

const { actions, reducer } = playStoreModalSlice;
export default reducer;
export const { closeModal } = actions;
