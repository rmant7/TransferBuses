import {createSlice} from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoadingTransfers: false,
        isLoadingNextTransfers: false
    },
    reducers: {
        setLoadingTransfers: (state, action) => ({...state, isLoadingTransfers: action.payload}),
        setLoadingNextTransfers: (state, action) => ({...state, isLoadingNextTransfers: action.payload})
    }
})

const {actions, reducer} = loadingSlice;
export default reducer;
export const {
    setLoadingTransfers, setLoadingNextTransfers
} = actions;