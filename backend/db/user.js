const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18,
    max:80
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  dob:{
    type: Date,
    required:true,

  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const User = new mongoose.model("users", userShcema);
module.exports = User;
