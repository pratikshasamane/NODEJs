const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validationToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_Token, (err, decode) => {
      if (err) {
        res.status(400).json("Unauthorized user!");
      }
      req.user = decode.user;
      // console.log(req.user.id);

      next();
    });

    if (!token) {
      res.status(400).json({ message: "Invalid token!" });
    }
  }
});

module.exports = validationToken;
