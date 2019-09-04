var express = require("express");
var bodyParser = require("body-parser");

//Inicializando el objeto express
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Components = Auth
var auth = require("./components/auth/routes");

//CORS ORIGIN MIDELWARE
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept,Access-Control-Request-Method,Authorization,territoken"
  );
  res.header("Access-Control-Request-Methods", "GET, POST,OPTIONS,PUT,DELETE");
  res.header("Allow", "GET, POST,OPTIONS,PUT,DELETE");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Frame-Options", "deny");
  res.header("X-Content-Type-Options", "nosniff");
  next();
});

// HTTP REQUEST
app.use("/api", auth);

// export content
module.exports = app;
