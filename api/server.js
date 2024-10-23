const express = require("express"); // import express to create server.
const mongoose = require("mongoose"); // import mongoose to connect to MongoDB database.
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000;

//routes

const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

dotenv.config(); // to use .env file

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(express.json()); // to parse JSON data from the client-side.
app.use(cors()); // to allow cross-origin requests from the client-side.
app.use(logger("dev")); // to log HTTP requests in the console.

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => res.send("Hello world"));

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
