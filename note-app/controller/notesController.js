const asyncHandler = require("express-async-handler");
const notes = require("../models/notesModel");

const getNotes = asyncHandler(async (req, res) => {
  const AllNotes = await notes.find({ user_id: req.user.id });
  res.status(200).json(AllNotes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, paragraph } = req.body;

  if (!title || !paragraph) {
    console.log("title/paragraph is blank");
  }

  const createNotes = await notes.create({
    title,
    paragraph,
    user_id: req.user.id,
  });
  res.status(200).json(createNotes);
});

const updateNotes = asyncHandler(async (req, res) => {
  const getById = await notes.findById(req.params.id);

  if (req.user.id !== getById.user_id.toString()) {
    res.status(403);
    throw new Error(
      "You don't have permission to update another user user is "
    );
  }

  const updateNotes = await notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // (id, update data, specifies that you want to receive the updated document
  res.status(200).json(updateNotes);
});

const deleteNotes = asyncHandler(async (req, res) => {
  const getById = await notes.findById(req.params.id);

  if (getById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You don't have permission to update another user user is "
    );
  }

  await notes.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Note deleted having id ${req.params.id}` });
});

const getNoteById = asyncHandler(async (req, res) => {
  // const byIdNote = await notes.find({ user_id: req.params.id });
  const byIdNote = await notes.findById(req.params.id);

  res.status(200).json(byIdNote);
});

module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNoteById,
};
