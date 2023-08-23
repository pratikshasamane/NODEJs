const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATIONS_ERROR:
      res.json({
        title: "Validation Falied",
        message: err.message,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unaunthorized",
        message: err.message,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
      });
      break;

    default:
      console.log("No error, All good!");
  }
};

module.exports = errorHandler;
