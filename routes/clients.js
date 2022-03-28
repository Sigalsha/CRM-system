const router = require("express").Router();
const fs = require("fs");
const Promise = require("bluebird");
Promise.promisifyAll(fs);
const Client = require("../models/ClientModel");
const {
  getClients,
  addNewClient,
  updateClient
} = require("../controllers/client.controllers");

const {
  updateClientValidator,
  addNewClientValidator
} = require("../helpers/index");

//GET - get all the clients form DB:
router.get("/", getClients);

// POST - add new client
router.post("/add", [addNewClientValidator], addNewClient);

//PUT - find client by id and update client's details:
router.put("/:id", [updateClientValidator], updateClient);

module.exports = router;
