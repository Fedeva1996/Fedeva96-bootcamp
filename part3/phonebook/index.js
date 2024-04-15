const express = require("express");
const app = express();

app.use(express.json());

let personas = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(personas);
});

app.get("/info", (request, response) => {
  const info = `<p>Phonebook has info for ${personas.length} people</p>`;
  const date = new Date();
  response.send(info + date);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = personas.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
