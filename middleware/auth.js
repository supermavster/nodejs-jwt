"use strict";
// Library
var moment = require("moment");
var jwt = require("jwt-simple");
var CryptoJS = require("crypto-js");
var CryptoJSsHA1 = require("crypto-js/sha1");
// Config Data (ENV)
var config = require("../config/token");

// Token
exports.getAccessToken = function(req, res, next) {
  var currentDate = moment().unix();
  var token = req.headers.token + currentDate;
  var words = CryptoJS.enc.Base64.parse(config.TOKEN_SECRET_ACCESS);
  var base64 = CryptoJS.enc.Base64.stringify(words);
  var decrypted = CryptoJSsHA1(config.TOKEN_SECRET_ACCESS);

  var final = CryptoJS.enc.Hex.stringify(decrypted) + currentDate;
  console.log("FINAL------------------");
  console.log(final);
  console.log("TOKEN------------------");
  console.log(token);
  if (token == final) {
    res.status(200).send({ code: 100, x_td_auth_token: createToken(final) });
  } else {
    res.status(200).send({ code: 102, message: "Invalid Token" });
  }
};

exports.createToken = function(user) {
  var payload = {
    // Parms Base Login (Can be more)
    sub: user.id,
    nombre: user.name,
    correo: user.email,
    iat: moment().unix(),
    exp: moment()
      .add(14, "years")
      .unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

// Auth
exports.isAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No estas logeado" });
  }
  var token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "El token ha caducado" });
    }
  } catch (ex) {
    return res.status(401).send({ message: "El token no es valido" });
  }
  req.user = payload;
  console.log(req.user);
  // next Action....
  next();
};

// Auth With URL (URL + Params + Method)
exports.authWithUrl = function(_url, _params, _method = "POST") {
  return new Promise(function(resolve, reject) {
    var request = require("request");
    var options = {
      method: _method,
      url: _url,
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded"
      },
      form: _params,
      rejectUnauthorized: false
    };
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
        return reject(error);
      } else {
        console.log(body);
        return resolve(body);
      }
    });
  });
};
