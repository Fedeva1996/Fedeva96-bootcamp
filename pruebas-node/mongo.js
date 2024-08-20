const mongoose = require("mongoose");
const connectionString = process.env.MONGODB_URI;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error(error);
  });
