const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const homeController = require("./controllers/homeController.js");

app.use("/", homeController)

app.listen(port, () => console.log(`Application is listening on port: ${port} | Computer: ${process.env.COMPUTERNAME}`))