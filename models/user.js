const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 256,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("user", userSchema);

const validateUser = (body) => {
  const user = joi.object({
    firstname: joi.string().min(2).max(50).required(),
    lastname: joi.string().min(2).max(50).required(),
    username: joi.string().min(2).max(50).required(),
    email: joi.string().min(4).max(50).required().email(),
    password: joi.string().min(6).max(50).required(),
  });

  return user.validate(body);
};

module.exports = { User, validateUser };
