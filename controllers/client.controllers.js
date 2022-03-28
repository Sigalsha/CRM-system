const ClientService = require("../services/client.services");

exports.getClients = async function (req, res, next) {
  try {
    const clients = await ClientService.getClients();

    return res.status(200).json({
      status: 200,
      data: clients,
      message: "Retrieved Clients Successfully"
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err });
  }
};

exports.updateClient = async function (req, res, next) {
  console.log("params ", req.params);
  console.log("body ", req.body);

  const updatedClient = {
    id: req.params.id,
    name: req.body.name ? req.body.name : "",
    country: req.body.country ? req.body.country : "",
    sold: req.body.sold ? req.body.sold : false,
    owner: req.body.owner ? req.body.owner : "",
    emailType: req.body.emailType ? req.body.emailType : null
  };

  console.log("updatedClient in ctrl", updatedClient);

  try {
    const client = await ClientService.updateClient(updatedClient);
    return res.status(200).json({
      status: 200,
      data: client,
      message: "client was successfully updated"
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err });
  }
};

exports.addNewClient = async function (req, res, next) {
  const name = req.body.name ? req.body.name : "";
  const owner = req.body.owner ? req.body.owner : "";
  const country = req.body.country ? req.body.country : "";

  try {
    const newClient = await ClientService.addNewClient({
      name,
      owner,
      country
    });
    console.log("new client in ctrl, from db ", newClient);

    res.status(200).json({
      status: 200,
      data: newClient,
      message: "new client was successfully added"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
