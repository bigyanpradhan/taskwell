const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Server-side error";

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

module.exports = { errorHandler };
