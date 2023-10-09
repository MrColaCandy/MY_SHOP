const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const UserRouter = require("./routes/UserRouter");
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
dotenv.config();
app.use(UserRouter);
mongoose
  .connect("mongodb+srv://Mahmood:1234@cluster0.pgfbmrw.mongodb.net/my-shop")
  .then(() => {
    app.listen(5000);
    console.log("Database connected!");
  });
