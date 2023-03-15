import {createSlice} from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        locations: null,
        transportationTypes: null,
        routes: null,
        travelData: null,
        flyingRoutes: null,
        onlandRoutes: null,
    },
    reducers: {
        setLocations: (state, action) => ({...state, locations: action.payload}),
        setRoutes: (state, action) => ({...state, routes: action.payload}),
        setTravelData: (state, action) => ({...state, travelData: action.payload}),
        setTransportationTypes: (state, action) =>
            ({...state, transportationTypes: action.payload}),
        setFlyingRoutes: (state, action) => ({...state, flyingRoutes: action.payload}),
        setOnlandRoutes: (state, action) => ({...state, onlandRoutes: action.payload}),
    }
})

export const getLocations = () => async (dispatch) => {
    const { default: jsonObject } = await import('../../cheapTripData/locations.json')
    dispatch(setLocations(jsonObject))
}
// export const getRoutes = () => async (dispatch) => {
//     const { default: jsonObject } = await import('../../cheapTripData/routes.json')
//     dispatch(setRoutes(jsonObject))
// }
// export const getTravelData = () => async (dispatch) => {
//     const { default: jsonObject } = await import('../../cheapTripData/travel_data.json')
//     dispatch(setTravelData(jsonObject))
// }
// export const getTransportationTypes = (path) => async (dispatch) => {
//     const { default: jsonObject } = await import('../../cheapTripData/transportation_types.json')
//     dispatch(setTransportationTypes(jsonObject))
// }
// export const getFlyingRoutes = (path) => async (dispatch) => {
//     const { default: jsonObject } = await import('../../cheapTripData/flying_routes/common/flying_routes.json')
//     dispatch(setFlyingRoutes(jsonObject))
// }
// export const getOnlandRoutes = (path) => async (dispatch) => {
//     const { default: jsonObject } = await import('../../cheapTripData/fixed_routes/common/fixed_routes.json')
//     dispatch(setOnlandRoutes(jsonObject))
// }

export default dataSlice.reducer
export const {
    setFlyingRoutes, setLocations, setOnlandRoutes, setRoutes, setTravelData, setTransportationTypes,
} = dataSlice.actions