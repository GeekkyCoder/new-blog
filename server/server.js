const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const mongooseSanitize = require("express-mongo-sanitize");

const authRouter = require("./routes/auth/auth.route");
require("dotenv").config();

const app = express();

const PORT = 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use(helmet());
app.use(express.json());
app.use(mongooseSanitize());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRouter);

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(`${err}`);
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(8000, () => {
      console.log(`listening at port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
