const router = require("express").Router();
const clients = require("./clients");
const auth = require("./auth");
const users = require("./users");

router.use("/clients", clients);
router.use("/auth", auth);
router.use("/users", users);

router.get("/error", (error, req, res) => {
  res.status(500);
  res.render("500.pug", { title: "500: Internal Server Error", error: error });
});

router.get("*", (req, res) => {
  res.status(404);
  res.render("404.pug", { title: "404: File Not Found" });
});

module.exports = router;
