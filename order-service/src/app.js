const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createOrder, getOrdersByCustomer, updateOrderStatus } = require("./controllers/orderController");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.post("/api/orders", createOrder);
app.get("/api/orders/customer/:customerId", getOrdersByCustomer);
app.patch("/api/orders/:id/status", updateOrderStatus);

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));