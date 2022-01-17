const UserService = require("../services/user.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // || config.get("jwtSecret")

exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  // check for existing user
  try {
    const user = await UserService.findUserByEmail({ email });
    console.log("user found in db:", user);
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error("Could not sign the token");
    console.log("res status: ", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      msg: "user is logged in"
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      msg: "user is logged in"
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.addNewUser = async function (req, res, next) {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await UserService.findUserByEmail({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = await UserService.addNewUser({ name, email, hash });
    if (!newUser) throw Error("Something went wrong while saving the user");

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      msg: "user has been registered successfully"
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserData = async function (req, res, next) {
  console.log(req.user.id, req.params.id);

  const { id } = req.user;

  if (!id) throw Error("no id was found on req.params");
  try {
    const user = await UserService.findUserById(id);
    console.log("user found in db by id: ", user);
    if (!user) throw Error("User does not exist");

    res.status(200).json({
      user: user,
      msg: "user has been successfully found"
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
