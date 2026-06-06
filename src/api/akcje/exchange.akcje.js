import { getExchangeRate } from "../../services/exchange.service.js";

export const getRate = async (req, res) => {
  try {
    const { currency } = req.params;

    const data = await getExchangeRate(currency.toUpperCase());

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};