const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

require("./config/db");

const userRouter = require("./api/users");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/user", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
