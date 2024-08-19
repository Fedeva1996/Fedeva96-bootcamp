require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const logger = require("./loggerMiddleware");
const cors = require("cors");
/* const http = require("http");
import { createServer } from "http"; */
const Note = require("./Models/Note");
const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleError");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(logger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;

  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;

  Note.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/notes", (request, response, next) => {
  const note = request.body;

  if (!note || !note.content) {
    return response.status(400).json({
      error: "content is missing",
    });
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false,
  });

  newNote
    .save()
    .then((saveNote) => {
      response.status(201).json(saveNote);
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;
  const note = request.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };

  Note.findByIdAndUpdate(id, newNoteInfo, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => {
      next(error);
    });
});

app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
