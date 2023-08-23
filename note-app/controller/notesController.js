const asyncHandler = require("express-async-handler");
const notes = require("../models/notesModel");

const getNotes = asyncHandler(async (req, res) => {
  const AllNotes = await notes.find({});
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
  });
  res.status(200).json(createNotes);
});

const updateNotes = asyncHandler(async (req, res) => {
  const updateNotes = await notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // (id, update data, specifies that you want to receive the updated document
  res.status(200).json(updateNotes);
});

const deleteNotes = asyncHandler(async (req, res) => {
  await notes.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Note deleted having id ${req.params.id}` });
});
module.exports = { getNotes, createNotes, updateNotes, deleteNotes };
