const User = require("../models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const createError = require("../utils/error")

const crypto = require('crypto');
const secret = 'randomtext';
const hash = crypto.createHmac('sha256', secret).digest('hex');


//Susen's not worked code
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ token });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


//kamal's code
async function signup(req, res) {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
    });
    
    await newUser.save();
    res.status(201).json({ message: "User has been created." });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup." });
  }
}


//Susen's not worked code
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     console.log(validPassword,'isValid')
//     console.log(password,'password')
//     console.log(user.password,'user.password')
    

//     if (!validPassword) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

    
//     const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });


//     res.status(200).json({ token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

//kamal's code
async function login(req, res) {
  try {
    console.log("Request Body:", req.body);

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    console.log("Checking password...");
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    console.log("Password check result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password or username" });
    }

    console.log("User Object:", user);

    console.log("JWT Secret:", process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    try {
      console.log("Generating token...");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log("Token generated:", token);

      const { password, ...otherDetails } = user._doc || user;
      
      res
        .cookie("acces_token", token, { httpOnly: true })
        .status(200)
        .json({ ...otherDetails });

    } catch (err) {
      console.error("JWT Sign Error:", err);
      return res.status(500).json({ message: "Error generating token." });
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
}


async function logOut(req, res, next) {
  try {
      res.redirect("/")
  } catch (err) {
      next(err)
  }
}
module.exports = {
  signup, login, logOut
}

