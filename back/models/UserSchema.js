const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required!"],
    minLength: [3, "Name is too short!"],
    maxLength: [32, "Name is too long!"],
  },
  email: {
    type: String,
    require: [true, "Email is required!"],
    minLength: [3, "Email is too short!"],
    maxLength: [300, "Email is too long!"],
    validate: {
      validator: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Email format is invalid!",
    },
  },
  password: {
    type: String,
    require: [true, "Password is required!"],
    minLength: [6, "Password is too short!"],
    maxLength: [64, "Password is too long!"],
  },
  image: {
    type: String,
    require: [true, "Image is required"],
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
