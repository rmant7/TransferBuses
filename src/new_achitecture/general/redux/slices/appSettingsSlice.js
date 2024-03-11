import {createSlice} from "@reduxjs/toolkit";

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        sidebar: false,
        lang: localStorage.getItem("locale") || "en",
        currency: localStorage.getItem("currency") || 'EUR',
    },
    reducers: {
        setSidebar: (state, action) => ({...state, sidebar: action.payload}),
        setLanguage: (state, action) => ({...state, lang: action.payload}),
        setCurrency: (state, action) => ({...state, currency: action.payload})
    }
})

const {actions, reducer} = appSettingsSlice;
export default reducer;
export const {
    setSidebar, setLanguage, setCurrency
} = actions;