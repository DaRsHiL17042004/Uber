const express = require("express");
const captainService = require("../services/captain.service");
const captainModel = require("../models/captain.model");
const BlacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const captainExists = await captainModel.findOne({ email });

  if (captainExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  // in model its a static method that's y we use captainModel.hashPassword
  const hashPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const captainObj = captain.toObject();
  delete captainObj.password;

  // in model its a method thsts y we use captain.generateAuthToken
  const token = await captain.generateAuthToken();
  return res.status(201).json({ token, captain: captainObj });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // in model its a method thsts y we use captain.comparePassword
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // in model its a method thsts y we use captain.comparePassword
  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({ token, captain });
};

module.exports.captainProfile = async (req, res) => {
  return res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistTokenModel.create({ token });

  res.clearCookie("token");

  return res.status(200).json({ message: "Logged out successfully" });
};
