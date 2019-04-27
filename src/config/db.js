const env = require("./env");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(env.mongoURI, {
    useNewUrlParser: true
  })

  .then(() => {
    console.log("successfully connected to db");
  })
  .catch(err => {
    console.log("could not connect to db", err);
    process.exit();
  });
