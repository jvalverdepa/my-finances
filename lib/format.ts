import { Currency } from "@prisma/client";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
});

export const formatDate = (date: Date) => dateFormatter.format(date);

export const formatEnglishCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const formatPeruvianCurrency = (amount: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(amount);

const currencyFormat: { [x: Currency[number]]: (amount: number) => string } = {
  [Currency.USD]: formatEnglishCurrency,
  [Currency.PEN]: formatPeruvianCurrency,
};

export const formatCurrency = (amount: number, currency: Currency) => {
  return currencyFormat[currency](amount);
};
