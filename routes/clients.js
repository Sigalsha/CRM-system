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
const auth = require("../middleware/auth");

const {
  updateClientValidator,
  addNewClientValidator
} = require("../helpers/index");

//GET - get all the clients form DB:
router.get("/", getClients);

/* router.get("/clients", async function(req, res) {
     Client.find((err, data) => {
    if (err) {
      console.log(err);
    }
    // console.log(data);
    res.send(data);
  }); 
}); */

// POST - add new client
router.post("/add", [addNewClientValidator], addNewClient);

//PUT - find client by id and update client's details:
router.put("/:id", [updateClientValidator], updateClient);

/*router.put("/clients", function(req, res) {
  let { id, name, country } = req.body;
  Client.findByIdAndUpdate(
    { _id: id },
    { name: name },
    { country: country },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});*/

module.exports = router;
