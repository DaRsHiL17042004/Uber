// routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, logoutUser, getUserProfile } = require("../controllers/user.controller");
const router = express.Router();
const {authUser } = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email. Please Enter an valid email."),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be 3 character long."),
    body("password").isLength({ min: 6 }).withMessage('Passowrd must have atleast 6 characters.'),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email. Please Enter an valid email."),
    body("password").isLength({ min: 6 }).withMessage('Passowrd must have atleast 6 characters.'),
  ],
  loginUser
);

router.get("/logout", authUser , logoutUser);

router.get("/profile", authUser , getUserProfile);

module.exports = router;
