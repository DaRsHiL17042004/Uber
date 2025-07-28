const userModel = require("../models/User.model");
const userService = require("../services/user.service");
const BlacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  //userModel. - Doesn’t need any user info — just hashes a value, so use it on the model.
  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  //user. - Needs specific user info like user._id, so use it on a user instance(object).
  const token = await user.generateAuthToken();
  return res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = await user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
  });

  return res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistTokenModel.create({ token });

  return res.status(200).json({ message: "Logged out successfully" });
};
