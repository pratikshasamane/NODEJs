const asyncHandler = require("express-async-handler");
const users = require("../models/userModels");
const mongoose = require("mongoose");
//@desc get all users
//@route api/
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const getUsers = await users.find({});
  res.status(200).json(getUsers);
});

//@desc create users
//@route api/
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, isActive } = req.body;
  if (!firstname || !lastname || !email) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const createusers = await users.create({
    firstname,
    lastname,
    email,
    isActive,
  });
  console.log(req.body);
  res.status(201).json(createusers);
});

//@desc update users
//@route api/updateUser/id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const updateuser = await users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updateuser);
});

//@desc delete users
//@route api/deleteUser
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const deleteuser = await users.findByIdAndDelete(req.params.id);
  res.status(200).send(deleteuser);
});

//@desc get user by id
//@route api/
//@access public
const getUserByID = asyncHandler(async (req, res) => {
  const getById = await users.findById(req.params.id);
  res.status(200).json(getById);
});

//@desc get user by id
//@route api/search/
//@access public
const searchUser = asyncHandler(async (req, res) => {
  const { email, id } = req.query;
  const matchQuery = {};

  if (id) {
    matchQuery["_id"] = mongoose.Types.ObjectId(id);
  }

  if (email) {
    matchQuery["email"] = email;
  }

  let userM = await users.aggregate([
    {
      $match: matchQuery,
    },
  ]);

  if (userM.length > 0) {
    res.json({ userM });
  } else {
    res.status(400);
    throw new Error("No user found with specified criteria!");
  }

  // if (email) {
  //   const getByEmail = await users.findOne({ email });
  //   if (getByEmail) {
  //     res.status(200).json(getByEmail);
  //   } else {
  //     res
  //       .status(404)
  //       .json({ message: "User with the provided email not found." });
  //   }
  // } else if (id) {
  //   const getById = await users.findById(id);
  //   if (getById) {
  //     res.status(200).json(getById);
  //   } else {
  //     res.status(404).json({ message: "User with the provided ID not found." });
  //   }
  // } else if (isActive) {
  //   const getIsActive = await users.find({ isActive });
  //   if (getIsActive) {
  //     res.status(200).json(getIsActive);
  //   } else {
  //     res.status(404).json({ message: "User with the provided ID not found." });
  //   }
  // }
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID,
  // getUserByEmail,
  searchUser,
};
