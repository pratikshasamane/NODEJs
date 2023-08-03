const asyncHandler = require("express-async-handler");
const users = require("../models/userModels");
const mongoose = require("mongoose");

//@desc get all users
//@route api/
//@access private
const getUsers = asyncHandler(async (req, res) => {
  const getUsers = await users.find({ user_id: req.user.id });
  res.status(200).json(getUsers);
});

//@desc create users
//@route api/
//@access private
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
    user_id: req.user.id,
  });
  console.log(req.body);
  res.status(201).json(createusers);
});

//@desc update users
//@route api/updateUser/id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const getById = await users.findById(req.params.id);
  console.log("req user id", req.user.id);
  if (req.user.id !== getById.user_id.toString()) {
    res.status(403);
    throw new Error(
      "You don't have permission to update another user user is "
    );
  }
  const updateuser = await users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updateuser);
});

//@desc delete users
//@route api/deleteUser
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const getById = await users.findById(req.params.id);

  if (getById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You don't have permission to update another user user is "
    );
  }
  const deleteuser = await users.findByIdAndDelete(req.params.id);

  res.status(200).send(deleteuser);
});

//@desc get user by id
//@route api/
//@access private
const getUserByID = asyncHandler(async (req, res) => {
  const getById = await users.findById(req.params.id);
  res.status(200).json(getById);
});

//@desc get user by id
//@route api/search/
//@access private
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
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID,
  searchUser,
};
