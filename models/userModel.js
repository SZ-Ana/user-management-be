const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // required: [true, "Please input an email!"],
      // unique: true,
      // validate: (email) => {
      //   return validator.isEmail(email);
      // },
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // validate: (password) => {
      //   return validator.isStrongPassword(password);
      // },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
