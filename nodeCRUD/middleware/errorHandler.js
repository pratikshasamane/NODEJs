const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATIONS_ERROR:
      res.json({
        title: "Validation Falied",
        message: err.message,
        // stacktrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        // stacktrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unaunthorized",
        message: err.message,
        // stacktrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        // stacktrace: err.stack,
      });
      break;

    default:
      console.log("No error, All good!");
  }
};

module.exports = errorHandler;
