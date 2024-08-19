module.exports = (error, request, response, next) => {
  console.error(error);
  switch (error.name) {
    case "CastError":
      response.status(400).json({ error: "ID used is malformed, " + error.message });
      break;
    case "ValidationError":
      response.status(400).json({ error: "Validation Error, " + error.message });
      break;
    default:
      response.status(500).json({ error: "Internal Server Error, " + error.message }).end();
      break;
  }
  next(error);
};
