import { currencies } from "./currencies";

type Currency = {
  name: string;
  code: string;
  oneEuroRate: number;
  r2rSymbol: string;
};

export const getByCode = (code: string): Currency | undefined => {
  return currencies.find((c) => c.code === code);
};

export const getSymbolByCode = (code: string): string | undefined => {
  const value = getByCode(code);
  return value ? value.r2rSymbol : undefined;
};

export const convertToGlobal = (count: number, currency: string): number => {
  const value = getByCode(currency);
  return value ? count / value.oneEuroRate : -1;
};

export const convert = (count: number, fromCurrency: string, toCurrency: string): number => {
  const to = getByCode(toCurrency);
  return to ? convertToGlobal(count, fromCurrency) * to.oneEuroRate : -1;
};

export const convertToFixed = (count: number, fromCurrency: string, toCurrency: string): number => {
  return toFixed(convert(count, fromCurrency, toCurrency));
};

export const toFixed = (count: number): number => {
  return Math.round(count * 100) / 100;
};

export const review = (count: number, currency: string): string => {
  return currency === "USD"
    ? `${getSymbolByCode(currency)}${count}`
    : `${count} ${getSymbolByCode(currency)}`;
};
