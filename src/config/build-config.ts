type BuildModeData = {
  mode: string;
  developer: string;
  version: string;
  db: string;
};

export const getMode = (): string => {
  return process.env.REACT_APP_BUILD_MODE as string;
};

export const getDb = (): string => {
  return process.env.REACT_APP_DB as string;
};

export const getDeveloper = (): string => {
  return process.env.REACT_APP_DEVELOPER as string;
};

export const getVersion = (): string => {
  return process.env.REACT_APP_VERSION as string;
};

export const getBuildModeDev = (): BuildModeData => {
  return getBuildMode("dev");
};

export const getBuildMode = (developer: string): BuildModeData => {
  return {
    mode: getMode(),
    developer: getDeveloper(),
    version: getVersion(),
    db: getDb(),
  };
};
