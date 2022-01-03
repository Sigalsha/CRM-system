const router = require("express").Router();
const { getAllUsers } = require("../controllers/user.controllers");
/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Private
 */
router.get("/", getAllUsers);

module.exports = router;
