import express from "express";
import { getRate } from "../akcje/exchange.akcje.js";

const router = express.Router();

router.get("/:currency", getRate);

export default router;