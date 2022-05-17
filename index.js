const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const { json } = require("express");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

mongoose.connect("mongodb://localhost:27017/mern-auth", (err) => {
  if (err) return console.log(err);
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Received at /");
});

//routes

app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
