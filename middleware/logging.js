const loggingMiddleware = (req, res, next) => {
  if (req) {
    console.log(req.method + " Request received.");
  }

  next();
};

module.exports = loggingMiddleware;
