const express = require("express");
const axios = require("axios").default;
const router = express.Router();
const { format } = require("date-fns");
const { subDays } = require("date-fns");

const solarEnergeticParticleController = router.get("/", async (_req, res, next) => {
  const constructedSepArray = [];
  const endDate = format(new Date(), "yyyy-MM-dd");
  // Set the start date to 29 days in the past
  const startDate = format(subDays(new Date(), 29), "yyyy-MM-dd");

  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/DONKI/SEP?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_API_KEY}`
    );

    for (let i = 0; i < data.length; i++) {
      const flr = data[i];
      constructedSepArray.push(flr);
    }
  } catch (error) {
    console.error(error);
    next();
  }
  res.json(constructedSepArray);
});

module.exports = solarEnergeticParticleController;
