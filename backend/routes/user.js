const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign up api
router.post("/sign-in", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: "Username already exist" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username have atleast 4 characters" });
    }
    if (existingEmail) {
      return res.status(200).json({ message: "Email already exist" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "SignIn successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

// login
router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  bcrypt.compare(password, existingUser.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "tcmTM") }];
      const token = jwt.sign({ authClaims }, "tcmTM", { expiresIn: "2d" });
      res.status(200).json({id:existingUser._id,token : token})
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  });
});
module.exports = router;
