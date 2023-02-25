const db = require("./connection");

const getClients = async () => {
  const [clients] = await db.query("SELECT * FROM pms_clients");
  return clients;
};

const getSingleClient = async (client_name, client_id) => {
  const [client] = await db.query("SELECT * FROM pms_clients WHERE client_name=? OR client_id=?", [client_name, client_id]);
  return client[0];
};

const addClient = async (client) => {
  const { client_name, client_adresse, client_contact, client_email, client_site } = client;
  await db.query("INSERT INTO pms_clients (client_name, client_adresse, client_contact, client_email, client_site) VALUES (?,?,?,?,?)", [client_name, client_adresse, client_contact, client_email, client_site]);
};

const updateClient = async (client, client_id) => {
  const { client_name, client_adresse, client_contact, client_email, client_site } = client;
  await db.query("UPDATE pms_clients SET client_name=? , client_adresse=?, client_contact=?, client_email=?, client_site=? WHERE client_id=?", [client_name, client_adresse, client_contact, client_email, client_site, client_id]);
};

const deleteClient = async (client_id) => {
  await db.query("DELETE FROM pms_clients WHERE client_id=?", [client_id]);
};

// updateClient(
//   {
//     client_name: "Test clien",
//     client_adresse: "strasse 89",
//     client_contact: "78945",
//     client_email: "alek@e-sem.com",
//     client_site: "www.client.com",
//   },
//   32
// );

// add client
// update client
// delete client

module.exports = {
  getClients,
  getSingleClient,
  addClient,
  updateClient,
  deleteClient,
};
