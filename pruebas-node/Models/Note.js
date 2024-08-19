const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.error("error connecting to database", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true, minLength: 5 },
  date: Date,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
