const express = require("express");
const methodOverride = require('method-override')
const bodyParser = require("body-parser");
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require('express-session');
require("dotenv").config();

const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

app.set('views', `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// Flash
app.use(cookieParser('Ghi gì cũng được'));
app.use(session({ cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true, secret: "123456"}));
app.use(flash());
// End Flash

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
