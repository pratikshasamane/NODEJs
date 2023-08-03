const express = require("express");
const validateToken = require("../middleware/validationToken");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller/validationController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/currentUser", validateToken, currentUser);

module.exports = router;
