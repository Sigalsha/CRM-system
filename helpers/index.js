const { check, validationResult } = require("express-validator");

exports.updateClientValidator = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Client name can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for client name!"),

  check("sold").isBoolean(),

  check("owner")
    .not()
    .isEmpty()
    .withMessage("Client owner can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for client owner!"),

  check("country")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Client country can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for client country!"),

  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

exports.addNewClientValidator = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Client name can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for client name!"),

  check("owner")
    .not()
    .isEmpty()
    .withMessage("Client owner can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for client owner!"),

  check("country")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Client country can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for client country!"),

  (req, res, next) => {
    let errors = validationResult(req);
    console.log("errors in validators ", errors);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
