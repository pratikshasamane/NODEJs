const express = require("express");
const {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNoteById,
} = require("../controller/notesController.js");
const router = express.Router();

const validationToken = require("../middleware/validationToken.js");
router.use(validationToken);

router.route("/").get(getNotes);

router.route("/create").post(createNotes);

router.route("/update/:id").put(updateNotes);
router.route("/delete/:id").delete(deleteNotes);
router.route("/getById/:id").get(getNoteById);

module.exports = router;
