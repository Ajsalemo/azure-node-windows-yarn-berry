const express = require("express");
const axios = require("axios").default;
const router = express.Router();
const { format } = require("date-fns");
const { subDays } = require("date-fns");

const coronalMassEjectionController = router.get("/", async (_req, res, next) => {
  const constructedCmeArray = [];
  const endDate = format(new Date(), "yyyy-MM-dd");
  // Set the start date to 29 days in the past
  const startDate = format(subDays(new Date(), 7), "yyyy-MM-dd");

  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_API_KEY}`
    );

    for (let i = 0; i < data.length; i++) {
      const flr = data[i];
      constructedCmeArray.push(flr);
    }
  } catch (error) {
    console.error(error);
    next();
  }
  res.json(constructedCmeArray);
});

module.exports = coronalMassEjectionController;
