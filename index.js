const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();
app.use(express.json());

//GET request
app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 8800;
app.listen(PORT, console.log(`server is running on port ${PORT}`));
