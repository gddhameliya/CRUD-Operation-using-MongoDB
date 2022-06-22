const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost:27017/CURD_Operation")
  .then(() => console.log("Connect successfully......"))
  .catch((e) => console.log("Sorry !! connection failed..."));

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(15).required(),
  });
}

module.exports = { User, validateUser };
