const config = require("config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // || config.get("jwtSecret")

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token
  if (!token) {
    // status unauthorized
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
