// IMPORTANT - This is needed - see this: https://yarnpkg.com/features/pnp#initializing-pnp
// Or else this will fail since iisnode is running directly against our entrypoint (server.js) and NOT starting the application with package.json scripts (yarn start)
require('./.pnp.cjs').setup();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const homeController = require("./controllers/homeController.js");

app.use("/", homeController)

app.listen(port, () => console.log(`Application is listening on port: ${port} | Computer: ${process.env.COMPUTERNAME}`))