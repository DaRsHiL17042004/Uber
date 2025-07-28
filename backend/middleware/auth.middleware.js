// middleware/authMiddleware.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User.model");
const BlacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  const isBlackListed = await BlacklistTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    
    req.user = user;

    return next();

  } catch (err) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  const isBlackListed = await BlacklistTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const captain = await captainModel.findById(decoded.id);

    req.captain = captain;

    return next();

  } catch (err) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

