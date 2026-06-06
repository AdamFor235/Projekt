// src/services/exchange.service.js
import axios from "axios";

export const getExchangeRate = async () => {
  const currencies = ["EUR", "USD"];

  const results = await Promise.all(
    currencies.map(async (cur) => {
      const res = await axios.get(
        `https://api.nbp.pl/api/exchangerates/rates/A/${cur}/?format=json`
      );

      return {
        currency: cur,
        rate: res.data.rates[0].mid
      };
    })
  );

  return results;
};