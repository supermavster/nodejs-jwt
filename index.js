/**
 * Init in cosole with:
 *      clear && node index.js
 */
"use strict";
// Call Elements base (libs)
var app = require("./app");
var server = require("http").createServer(app);
var config = require("./config/token");

// Init Aplication
server.listen(config.PORT, () => {
  console.log(
    "Aplicación inicializada, puede ver la aquí:\n-> http://localhost:" +
      config.PORT
  );
  // Show Api - Example
  console.log(
    "\nTo Generate Token: http://localhost:" +
      config.PORT +
      "/api/v1/auth/get-access-token"
  );
});

// Optional SSL
require("https").globalAgent.options.ca = require("ssl-root-cas/latest").create();
