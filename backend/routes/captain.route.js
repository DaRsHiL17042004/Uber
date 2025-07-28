const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, logoutCaptain, captainProfile } = require("../controllers/captain.controller");
const { authCaptain } = require("../middleware/auth.middleware");

router.post('/register', [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
  body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color must be at least 3 characters long"),
  body("vehicle.plate").isLength({ min: 3 }).withMessage("Vehicle plate must be at least 3 characters long"),
  body("vehicle.capacity").isNumeric().withMessage("Vehicle capacity must be a number").isInt({ min: 2 }).withMessage("Vehicle capacity must be at least 2"),
  body("vehicle.vehicleType").isIn(["CAR", "BIKE", "AUTO"]).withMessage("Invalid vehicle type"),
], registerCaptain);

router.post('/login', [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginCaptain);

router.get('/profile', authCaptain, captainProfile);

router.get('/logout', authCaptain, logoutCaptain);


module.exports = router;