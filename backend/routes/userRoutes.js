const express = require("express");
const router = express.Router();
const User = require("../db/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { firstname,lastname,email,age,address,dob,gender,phoneNo, password, confirmPassword } = req.body;
    try {
        if(password !== confirmPassword ){
            throw new Error('password not match')
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            firstname,
            lastname,
            age,
            address,
            dob,
            gender,
            phoneNo,            
            email,
            password: hashedPassword,
        });
        const result = await userData.save();
        res.send(result);
    } catch (error) {
        console.log("error", error);
        res.send(error.message);
    }
});

router.get("/", async (req, res) => {
  const data = await User.find();
  // console.log(data);
  res.json(data);
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body, "adfv");

    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    console.log("user ", findUser);

    const isMatch = await bcrypt.compare(password, findUser.password);
    console.log(isMatch);

    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    console.log("tpken", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // local development → false
      sameSite: "lax",
    });
    res.json({findUser });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("login failed" || error.message);
  }
});

module.exports = router;
