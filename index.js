/**
 * Init in cosole with:
 *      npm start
 *
 * Use POSTMAN ...
 */
"use strict";
// Call Elements base (libs)
var app = require("./app");
var server = require("http").createServer(app);
var config = require("./config/token");

// Init Aplication
server.listen(config.PORT, config.HOSTNAME, () => {
  console.log(`Server running at http://${config.HOSTNAME}:${config.PORT}/\n`);

  // Show Api - Example
  console.log(
    `\nTo Generate Token: http://${config.HOSTNAME}:${config.PORT}/api/v1/auth/get-access-token\n`
  );
  // Show Api - Example
  console.log(
    `\nTo Check Token (Header: x_td_auth_token): http://${config.HOSTNAME}:${config.PORT}/api/v1/auth/check-token\n`
  );
  // Show Api - Example
  console.log(
    `\nTo Generate Token with a Service (POST): http://${config.HOSTNAME}:${config.PORT}/api/v1/auth/get-access-token-service\n`
  );
});

// Optional SSL
require("https").globalAgent.options.ca = require("ssl-root-cas/latest").create();
