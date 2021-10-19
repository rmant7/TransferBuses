type BuildModeData = {
  mode: string;
  developer: string;
  version: string;
  db: string;
};

export const getMode = (): string => {
  return process.env.NODE_ENV;
};

export const getDb = (): string => {
  return getMode() === "production"
    ? (process.env.REACT_APP_DB_PRODUCTION as string)
    : (process.env.REACT_APP_DB_DEVELOPMENT as string);
};

export const getBuildModeDev = (): BuildModeData => {
  return getBuildMode("dev");
};

export const getBuildMode = (developer: string): BuildModeData => {
  const date = new Date();
  const ver = `v.${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  return {
    mode: getMode(),
    developer,
    version: ver,
    db: getDb(),
  };
};
