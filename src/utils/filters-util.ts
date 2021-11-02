type Filter = {
  key: string;
  operator: string;
  value: any;
};

const EQUALS_OPERATOR = "==";
const IN_OPERATOR = "in";
const FILTER_KEYS = ["from", "to", "date", "passAParcel", "isPetsAllowed", "regularTrips"];

const defaultFilter = {
  key: "",
  operator: EQUALS_OPERATOR,
  value: "",
};

export const getFilterUri = (url: string, obj: Object): string => {
  let path = "";
  const entries = Object.entries(obj);
  for (let [key, value] of entries) {
    if (value && value !== "") {
      path += `${key}=${value}&`;
    }
  }
  return path !== "" ? url + "?" + path.slice(0, -1) : url;
};

export const convertToFilterFromObject = (obj: Object): Filter[] => {
  const res: Filter[] = [];
  const entries = Object.entries(obj);
  for (let [key, value] of entries) {
    if (isValue(value)) {
      if (value instanceof Array) {
        res.push({
          key,
          operator: value.length > 1 ? EQUALS_OPERATOR : IN_OPERATOR,
          value: value.length > 1 ? value[0] : value,
        });
      } else {
        res.push({ ...defaultFilter, key, value });
      }
    }
  }
  return res;
};

export const convertToFilter = (values: any[], keys?: string[] | undefined): Filter[] => {
  const res: Filter[] = [];
  if (keys) {
    keys.forEach((k, i) => {
      const key = FILTER_KEYS.find((item) => item === k);
      const value = values[i];
      if (key && isValue(value)) {
        res.push({ ...defaultFilter, key, value });
      }
    });
  } else {
    return toFilters(values);
  }
  return res;
};

export const toFilters = (values: any[]): Filter[] => {
  const res: Filter[] = [];
  FILTER_KEYS.forEach((key, i) => {
    const value = values[i];
    if (isValue(value)) {
      res.push({ ...defaultFilter, key, value });
    }
  });
  return res;
};

function isValue(v: any): boolean {
  return v && v !== "" && v !== undefined && v !== null;
}
