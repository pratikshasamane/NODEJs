const validationModel = require("../models/validationModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExist = await validationModel.findOne({ email });

  if (email == alreadyExist) {
    res.status(401).json({ message: "Email already registerd" });
  }

  const newPass = await bcrypt.hash(password, 10);
  const registerUser = await validationModel.create({
    name: name,
    email: email,
    password: newPass,
  });

  const { _id } = await registerUser.toJSON();

  const token = jwt.sign({ _id: _id }, "secret");

  res.cookie("accessToken", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  if (registerUser) {
    res.json({
      message: `${registerUser.name} is registered`,
      _id: registerUser.id,
      email: registerUser.email,
    });
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("hello");
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const user = await validationModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  }
});

const current = async function (req, res) {
  // const cookie = req.cookies["accessToken"];
  // const claim = jwt.verify(cookie, "secret");
  // console.log(claim._id);

  // const { password, ...data } = await user.toJSON();
  // // if (claim) {
  // // }
  res.json(req.user);
};
module.exports = { login, register, current };
