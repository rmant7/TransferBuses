import {createSlice} from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoadingTransfers: false,
        isLoadingNextTransfers: false,
        isLoadingNewTransfer: false,
    },
    reducers: {
        setLoadingTransfers: (state, action) => ({...state, isLoadingTransfers: action.payload}),
        setLoadingNextTransfers: (state, action) => ({...state, isLoadingNextTransfers: action.payload}),
        setLoadingUploadTransfers: (state, action) => ({...state, isLoadingNewTransfer: action.payload})
    }
})

const {actions, reducer} = loadingSlice;
export default reducer;
export const {
    setLoadingTransfers, setLoadingNextTransfers, setLoadingUploadTransfers
} = actions;