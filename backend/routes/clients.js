const express = require("express");
const dbfunctions = require("../utils/clients-query");

const router = express.Router();
// /users

router.get("/", async (req, res) => {
  const clients = await dbfunctions.getClients();
  if (clients.lenght == 0) {
    return res.status(400).json({ message: "Clients list is empty." });
  }
  return res.status(231).send(clients);
});

router.get("/:client_id", async (req, res) => {
  const cid = req.params.client_id;
  const client = await dbfunctions.getSingleClient(null, cid);
  if (!client) {
    return res.status(400).json({ message: "Client not exist." });
  }
  res.status(231).send(client);
});

router.post("/new", async (req, res) => {
  const newClient = req.body;
  const client = await dbfunctions.getSingleClient(newClient.client_name);
  if (client) {
    return res.status(400).json({ message: "Client already exist." });
  }
  await dbfunctions.addClient(newClient);
  res.status(231).json({ message: "Client succesfully added." });
});

router.put("/:client_id/edit", async (req, res) => {
  const newClient = req.body;
  const cid = req.params.client_id;
  const client = await dbfunctions.getSingleClient(null, cid);
  if (!client) {
    return res.status(400).json({ message: "Client not exist." });
  }
  await dbfunctions.updateClient(newClient, cid);
  res.status(231).json({ message: "Client succesfully updated." });
});

router.delete("/:client_id/delete", async (req, res) => {
  const cid = req.params.client_id;
  const client = await dbfunctions.getSingleClient(null, cid);
  if (!client) {
    return res.status(400).json({ message: "Client not exist." });
  }
  await dbfunctions.deleteClient(cid);
  res.status(231).json({ message: "Client succesfully deleted." });
});

module.exports = router;
