const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID,
  // getUserByEmail,
  searchUser,
} = require("../controller/userController");
// const validateToken = require("../middleware/validationToken");

const router = express.Router();

// router.use(validateToken);

router.route("/").get(getUsers).post(createUser);

router.route("/updateUser/:id").put(updateUser);

router.route("/deleteUser/:id").delete(deleteUser);

router.route("/getUserById/:id").get(getUserByID);

// router.route("/getUserByEmail/:email").get(getUserByEmail);
router.route("/search").get(searchUser);

module.exports = router;

// Create user (have first name, last name as mandatory field) done
// Retrieve user details done
// Modify user details done
// Delete user (logical delete and physical delete) done
// List all active users
// Search user using name, mail and mobile number - done

/// segregate done (email, id, activeuser)
// isactive
//error handling
// constants added
// All API done
// register user done
// in between login user(JWT Token authentication done)
