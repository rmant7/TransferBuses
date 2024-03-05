import {createSlice} from "@reduxjs/toolkit";

const transferSlice = createSlice({
    name: 'transfer',
    initialState: {
        isFilterApply: false,
        transfers: [],
        nextTransfers: [],
    },
    reducers: {
        setFilterApply: (state, action) => ({...state, isFilterApply: action.payload}),
        setTransfers: (state, action) => ({...state, transfers: action.payload}),
        setNextTransfers: (state, action) => ({...state, nextTransfers: action.payload})
    }
})

const {actions, reducer} = transferSlice;
export default reducer;
export const {
    setFilterApply, setTransfers, setNextTransfers
} = actions;