const express = require("express");
const axios = require("axios").default;
const router = express.Router();
const { format } = require("date-fns");
const { subDays } = require("date-fns");

const solarFlareController = router.get("/", async (_req, res, next) => {
  const constructedFlrArray = [];
  const endDate = format(new Date(), "yyyy-MM-dd");
  // Set the start date to 7 days in the past
  const startDate = format(subDays(new Date(), 7), "yyyy-MM-dd");

  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_API_KEY}`
    );

    for (let i = 0; i < data.length; i++) {
      const flr = data[i];
      constructedFlrArray.push(flr);
    }
  } catch (error) {
    console.error(error);
    next();
  }
  res.json(constructedFlrArray);
});

module.exports = solarFlareController;
