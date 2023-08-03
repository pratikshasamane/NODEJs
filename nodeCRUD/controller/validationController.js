const asyncHandler = require("express-async-handler");
const valiationsSchema = require("../models/validationModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const env = require("en")

// Register User
const registerUser = asyncHandler(async (req, res) => {
  //   res.json({ message: "Register user" });

  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Username, email and password are mandatory !");
  }

  // check if user already availabel or not
  const isUserAvailabel = await valiationsSchema.findOne({ email });

  if (isUserAvailabel) {
    res.status(400);
    throw new Error(" User already Registered!");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // register user
  const createusers = await valiationsSchema.create({
    username,
    email,
    password: passwordHash,
  });

  console.log(`User is created ${createusers}`);

  if (createusers) {
    res.json({
      __id: createusers.id,
      email: createusers.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// Logged in user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds are mandatory to logged in!");
  }

  const user = await valiationsSchema.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accesToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accesToken });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
