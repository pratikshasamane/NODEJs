const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    console.log("im authheader");
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, decode) => {
      if (error) {
        res.status(401);
        throw new Error("User is not authorized!");
      }
      req.user = decode.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error();
    }
  }
});

module.exports = validateToken;
