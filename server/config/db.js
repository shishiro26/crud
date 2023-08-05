const mongoose = require("mongoose");
require("dotenv").config;

mongoose.connect = mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("The error in the database connection", err);
  });
