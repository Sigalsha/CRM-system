const User = require("../models/UserModel");

exports.findUserByEmail = async function ({ email }) {
  // check for existing user when trying to create a new user
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.log("err from service, while trying to find user");
    return (err = "Error while finding user or user does not exist");
  }
};

exports.findUserById = async function (id) {
  // check for existing user when trying to get user data
  try {
    return await User.findById(id).select("-password");
  } catch (err) {
    console.log("err from service, while trying to find user");
    return (err = "Error while finding user or user does not exist");
  }
};

exports.findAllUsers = async function () {
  console.log("in findAllUsers service");
  try {
    return await User.find();
  } catch (err) {
    console.log("err in service, while trying to find all users");
    return (err = "Error in service while trying to find all users");
  }
};

exports.addNewUser = async function ({ name, email, hash }) {
  console.log("params from /register ", { name, email, hash });
  try {
    const newUser = await new User({
      name,
      email,
      password: hash
    });

    newUser.save((err, data) => {
      if (err) {
        console.log("err from service, while trying to save a new user");
        return err;
      }
      console.log("new user was saved to db: ", data);
    });
    return newUser;
  } catch (err) {
    console.log("err from service, while trying to add a new user");
    return (err = "Error while trying to save a new user to db");
  }
};
