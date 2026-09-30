module.exports = {
  products: {
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => res.status(503).json({ message: "Product Service không khả dụng" })
    }
  },
  orders: {
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => res.status(503).json({ message: "Order Service không khả dụng" })
    }
  }
};