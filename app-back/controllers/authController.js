const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");


async function signup(req, res) {
  try {
    const { username, name, surname, email, password } = req.body;

    
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists || usernameExists) {
      return res.status(400).json({ message: "Email or username already exists!" });
    }

   
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);


    const newUser = new User({
      username,
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

   
    res.status(201).json({ message: "User created successfully. Redirecting to login..." });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup." });
  }
}


async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password or username" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error during login." });
  }
}

module.exports = {
  signup,
  login,
};
