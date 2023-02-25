const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// Routes
const usersRoute = require("./routes/users");
const clientsRoute = require("./routes/clients");
app.use("/users", usersRoute);
app.use("/clients", clientsRoute);

//
// error handler
app.use((req, res, next) => {
  const error = new Error("Nije pronađeno.");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Server Error",
    },
  });
});

app.listen(8080, () => {
  console.log(`Server run on port ${PORT}`);
});
