const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// Import cấu hình & middleware từ các thư mục con
const routeConfig = require("./config/routes");
const limiter = require("./middleware/rateLimiter");
const authenticate = require("./middleware/auth");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*" }));

// Sử dụng Rate Limiting Middleware
app.use(limiter);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", gateway: true }));

// Route: /products/* -> Product Service
app.use("/api/products", authenticate, createProxyMiddleware(routeConfig.products));

// Route: /orders/* -> Order Service
app.use("/api/orders", authenticate, createProxyMiddleware(routeConfig.orders));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));