const express = require("express");
require("dotenv").config();

const database = require("./config/database");
database.connect();

const route = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);
// End Routes

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
