const { AppError } = require("./customErrorHandler");

exports.errorHandler = (err, req, res, next) => {

  console.log('server error', err);
  
  
    if (res.headersSent) return next(err);

      if (err instanceof AppError) {
        return res.status(err.status).json({
          success: false,
          message: err.message,
          code: err.code,
          details: err.details
        });
      }


  res.status(err.status || 500).json({
    success: false,
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Internal server error'
  });
};
