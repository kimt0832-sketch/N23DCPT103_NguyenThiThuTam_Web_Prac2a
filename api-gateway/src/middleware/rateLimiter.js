const rateLimit = require("express-rate-limit");

// Rate limiting: tối đa 100 request / 15 phút / IP
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

module.exports = limiter;