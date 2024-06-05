const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (Document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
});

const Note = model("Note", noteSchema);

// Note.find({}).then((notes) => {
//   console.log(notes);
//   mongoose.connection.close();
// });

// const note = new Note({
//   content: "This is another note",
//   date: new Date(),
//   important: true,
// });

// note
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = Note;
