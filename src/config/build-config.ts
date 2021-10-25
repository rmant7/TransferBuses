type BuildModeData = {
  mode: string;
  developer: string;
  version: string;
  collection: string;
  filterFromCityCollection: string;
};

export const getMode = (): string => {
  return process.env.REACT_APP_BUILD_MODE as string;
};

export const getCollection = (): string => {
  return process.env.REACT_APP_FIREBASE_COLLECTION as string;
};

export const getFromCityCollection = (): string => {
  return process.env.REACT_APP_FIREBASE_COLLECTION_FILTER_FROM_CITY as string;
};

export const getDeveloper = (): string => {
  return process.env.REACT_APP_DEVELOPER as string;
};

export const getVersion = (): string => {
  return process.env.REACT_APP_VERSION as string;
};

export const getBuildMode = (): BuildModeData => {
  return {
    mode: getMode(),
    developer: getDeveloper(),
    version: `v.${getVersion()}`,
    collection: getCollection(),
    filterFromCityCollection: getFromCityCollection(),
  };
};
