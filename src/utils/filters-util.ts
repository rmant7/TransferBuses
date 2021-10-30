type Filter = {
  key: string;
  value: any;
};

const FILTER_KEYS = ["from", "to", "date", "passAParcel", "isPetsAllowed", "regularTrips"];

export const convertToFilter = (values: any[], keys?: string[] | undefined): Filter[] => {
  const res: Filter[] = [];
  if (keys) {
    keys.forEach((k, i) => {
      const key = FILTER_KEYS.find((item) => item === k);
      const value = values[i];      
      if (key && isValue(value)) {
        res.push({ key, value });
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
      res.push({ key, value });
    }
  });
  return res;
};

function isValue(v: any): boolean {
  return v !== "" && v !== undefined && v !== null;
}
