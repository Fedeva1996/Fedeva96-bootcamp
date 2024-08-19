module.exports = (error, request, response, next) => {
  console.error(error);
  switch (error.name) {
    case "CastError":
      response.status(400).json({ error: "ID used is malformed" });
      break;
    default:
      response.status(500).json({ error: "Internal Server Error" }).end();
      break;
  }
};
