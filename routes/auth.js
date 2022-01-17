const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  loginUser,
  addNewUser,
  getUserData
} = require("../controllers/auth.controllers");

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   POST /auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", addNewUser);

/**
 * @route   GET /auth/user
 * @desc    Get user data
 * @access  Private
 */
router.get("/user", auth, getUserData);

module.exports = router;
