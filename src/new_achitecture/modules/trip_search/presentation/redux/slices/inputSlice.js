import {createSlice} from "@reduxjs/toolkit";

const transferSlice = createSlice({
    name: 'inputFromToCity',
    initialState: {
        inputFromCity: '',
        inputToCity: ''
    },
    reducers: {
        setFromCity: (state, action) => ({...state, inputFromCity: action.payload}),
        setToCity: (state, action) => ({...state, inputToCity: action.payload}),
    }
})

const {actions, reducer} = transferSlice;
export default reducer;
export const {
    setFromCity, setToCity} = actions;