const express = require("express");
const {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} = require("../controller/notesController.js");
const router = express.Router();

router.route("/").get(getNotes);
router.route("/create").post(createNotes);

router.route("/update/:id").put(updateNotes);
router.route("/delete/:id").delete(deleteNotes);

module.exports = router;
