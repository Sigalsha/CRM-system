const UserService = require("../services/user.services");

exports.getAllUsers = async function (req, res, next) {
  console.log("in getAllUsers controller");
  try {
    const users = await UserService.findAllUsers();
    if (!users) throw Error("No users exist");
    res.json(users);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
