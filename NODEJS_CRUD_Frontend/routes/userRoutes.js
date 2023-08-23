const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID,
  searchUser,
} = require("../controller/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/updateUser/:id").put(updateUser);

router.route("/deleteUser/:id").delete(deleteUser);

router.route("/getUserById/:id").get(getUserByID);

router.route("/search").get(searchUser);

module.exports = router;
