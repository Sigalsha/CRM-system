const Client = require("../models/ClientModel");
const fs = require("fs");
const Promise = require("bluebird");
Promise.promisifyAll(fs);
/* const fileData = fs.readFileSync("data.json");
const clientsData = JSON.parse(fileData); */

exports.saveInitialClients = async function() {
  try {
    const fileData = await fs.readFileSync("data.json");
    const clients = await JSON.parse(fileData);

    clients.forEach((client) => {
      let newClient = new Client({
        name: client.name,
        email: client.email,
        firstContact: client.firstContact,
        emailType: client.emailType ? client.emailType : null,
        sold: client.sold,
        owner: client.owner,
        country: client.country,
      });

      newClient.save((err, data) => {
        if (err) {
          console.log(
            "err when trying to save client from json to db, client: ",
            data
          );
          console.log(
            "err when trying to save client from json to db, err: ",
            err
          );
        }
      });
    });
  } catch (err) {
    console.log("err from saving json to db: ", err);
  }
};

exports.getClients = async function(data) {
  try {
    const clients = await Client.find(data);
    console.log("getting clients data from db", clients[0]);
    return clients;
  } catch (err) {
    return (err = "Error while getting clients");
  }
};

/* exports.getClient = async function({ name }) {
  try {
    const client = await Client.findOne({ name: name });
    console.log("found client in db ", client);
    return client;
  } catch (err) {
    return (err = "Error while trying to find client in db");
  }
}; */

exports.updateClient = async function(updatedC) {
  console.log("req params/body from ctrl - updateClient ", updatedC);

  const updatedData = Object.fromEntries(Object.entries(updatedC).slice(1, 5));

  try {
    const clientToUpdate = await Client.findByIdAndUpdate(
      updatedC.id,
      {
        name: updatedC.name,
        country: updatedC.country,
        owner: updatedC.owner,
        sold: updatedC.sold,
        emailType: updatedC.emailType,
      },
      { new: true },
      (data, err) => {
        if (err) {
          return (err = "Error while updating client");
        }
        console.log("clientToUpdate from db ", data);
      }
    );

    console.log("clientToUpdate from db ", clientToUpdate);

    return clientToUpdate;
    // let clientToUpdate = await Client.findById(updatedC.id);

    /*     clientToUpdate = {
      name: updatedC.name ? updatedC.name : clientToUpdate.name,
      country: updatedC.country ? updatedC.country : clientToUpdate.country,
      owner: updatedC.owner ? updatedC.owner : clientToUpdate.owner,
      sold: updatedC.sold ? updatedC.sold : clientToUpdate.sold,
    }; */

    // console.log("clientToUpdate after update, before saving: ", clientToUpdate);

    /*   clientToUpdate.save().then((err) => {
      if (err) {
        return err;
      }
      return clientToUpdate;
    }); */
  } catch (err) {
    return (err = "Error while updating client");
  }
};

exports.addNewClient = async function({ name, owner, country }) {
  console.log("req params/body from ctrl - addNewClient", owner, name, country);

  try {
    const newClient = await new Client({
      name,
      owner,
      country,
      firstContact: new Date().toISOString(),
      sold: false,
      emailType: null,
    });

    console.log("newClient in service", newClient);

    newClient.save((err, data) => {
      if (err) {
        console.log(
          "err when trying to save client from json to db, client: ",
          data
        );
        console.log(
          "err when trying to save client from json to db, err: ",
          err
        );
        return err;
      }
      console.log("new client was saved to db: ", data);
    });
    return newClient;
  } catch (err) {
    return (err = "Error while trying to save new client to db");
  }
};
