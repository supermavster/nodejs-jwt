// Call Lib
var globalServices = require("../../../middleware/auth"); // Some Another Action

// Login Example
exports.login = function(req, res, next) {
  console.log(
    "You are login because the token and the access token is valid, this call is allow by the method next()"
  );
  return res.status(200).send({ code: "100", data: "You are login" });
};

// // Method - Make Token
// exports.makeToken = function(req, res, next) {
//   // Auth Service
//   globalServices
//     .auth()
//     .then(function(result) {
//       // Get Data
//       var token = result.replace(/['"]+/g, "");
//       console.log(token);
//     })
//     .catch(function(err) {
//       res.send(err);
//     });
// };
