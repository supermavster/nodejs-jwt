"use strict";
// Library
var moment = require("moment");
var jwt = require("jwt-simple");
// CRYPTO JS
// var CryptoJS = require("crypto-js");
// var CryptoJSsHA1 = require("crypto-js/sha1");

// Config Data (ENV)
var config = require("../config/token");

// Token
exports.getAccessToken = function(req, res, next) {
  // CRYPTO JS
  // var currentDate = moment().unix();
  // var token = req.headers.token + currentDate;
  // var words = CryptoJS.enc.Base64.parse(config.TOKEN_SECRET_ACCESS);
  // var base64 = CryptoJS.enc.Base64.stringify(words);
  // var decrypted = CryptoJSsHA1(config.TOKEN_SECRET_ACCESS);
  // var final = CryptoJS.enc.Hex.stringify(decrypted) + currentDate;

  var user = {
    id: 1,
    name: "Mr. Test",
    email: "test@kubo.co"
  };

  if (user) {
    var token = module.exports.createToken(user);
    console.log("\nTOKEN------------------");
    console.log(token);
    console.log("FINAL------------------\n");
    res.status(200).send({ code: 100, x_td_auth_token: token });
  } else {
    console.log("Error with the Tokens");
    res.status(200).send({ code: 102, message: "Error with the Tokens" });
  }
};

exports.createToken = function(user) {
  var data = {
    // Parms Base Login (Can be more)
    sub: user.id,
    nombre: user.name,
    correo: user.email,
    iat: moment().unix(),
    exp: moment()
      .add(14, "years")
      .unix()
  };
  return jwt.encode(data, config.TOKEN_SECRET);
};

// Auth
exports.isAuth = function(req, res, next) {
  if (!req.headers.x_td_auth_token) {
    return res
      .status(403)
      .send({ message: "You don't have Autorization Token" });
  }
  var token = req.headers.x_td_auth_token.replace(/['"]+/g, "");
  try {
    var data = jwt.decode(token, config.TOKEN_SECRET);
    if (data.exp <= moment().unix()) {
      return res.status(401).send({ message: "The token is expired" });
    }
    console.log("\nShow Token");
    console.log(token);
    console.log("\nShow Data");
    console.log(data);
    return res.status(200).send({ data: data });
  } catch (ex) {
    return res.status(401).send({ message: "Token invalid" });
  }
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
