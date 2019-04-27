const express = require("express");
const bodyparser = require("body-parser");
const port = require("./config/env").port;
const app = express();
//connect to db
require("./config/db");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => {
  console.log("server is runningon port : " + port);
});
