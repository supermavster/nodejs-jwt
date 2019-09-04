// Call Lib
var globalServices = require("../../../middleware/auth");

// Method - Make Token
exports.makeToken = function(req, res, next) {
  // Data Main
  var iddimension = req.params.iddimension;
  var municipio = req.params.municipio;
  var nombre = req.params.nombre;
  // Auth Service
  globalServices
    .auth()
    .then(function(result) {
      // Get Data
      var token = result.replace(/['"]+/g, "");
      console.log(token);
    })
    .catch(function(err) {
      res.send(err);
    });
};
