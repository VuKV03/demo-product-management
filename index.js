const express = require("express");
const methodOverride = require('method-override')
const bodyParser = require("body-parser");
require("dotenv").config();

const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// End Variables

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
routeAdmin(app);
routeClient(app);
// End Routes

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
