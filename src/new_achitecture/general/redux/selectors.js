export const getCurrency = (state) => state.app.currency;
export const getLanguage = (state) => state.app.lang;
export const getSidebar = (state) => state.app.sidebar;
//selector for non-existing field
export const getTransfersData = (state) => state.transfersData;
export const getLoading = (state) => state.loading;
export const getInputFromToCity = (state) => state.inputFromToCity;