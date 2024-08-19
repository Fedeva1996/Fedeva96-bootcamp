const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const people = require("./models/people");
const People = require("./models/people");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  people.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  People.find({}).then((person) => {
    response.json(`<p>Phonebook has info for ${person.length} people</p>`);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;

  people.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;

  People.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  People.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({
        error: "name already exists",
      });
    }

    const newPerson = new People({
      name: body.name,
      number: body.number,
    });

    newPerson.save().then(savedPerson => {
      response.status(201).json(savedPerson);
    }).catch(error => {
      response.status(500).json({ error: error.message });
    });
  }).catch(error => {
    response.status(500).json({ error: error.message });
  });
});

morgan("combined", {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
