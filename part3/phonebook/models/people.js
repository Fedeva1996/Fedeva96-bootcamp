const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(result => {
  console.log("connected to database");
}).catch(error => {
  console.error("error connecting to database", error.message); 
});

const peopleSchema = new mongoose.Schema({
  name: {type: String, required: true, minLength: 3},
  number: {type: String, required: true, minLength: 10}
});

peopleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
});

const People = mongoose.model("people", peopleSchema, "people");

module.exports = People;
