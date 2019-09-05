"use strict";
// Library
var moment = require("moment");
var jwt = require("jwt-simple");
// CRYPTO JS
// var CryptoJS = require("crypto-js");
// var CryptoJSsHA1 = require("crypto-js/sha1");
const crypto = require("crypto");

// Config Data (ENV)
var config = require("../config/token");

// Token
exports.getAccessToken = function(req, res, next) {
  // CRYPTO JS
  // echo base64_encode(openssl_encrypt($str = config.SECRET_API ."/". time(), 'AES-128-CBC', config.KEY_TOKEN_API, OPENSSL_RAW_DATA, config.IV));
  var currentDate = moment().unix();
  var token = config.SECRET_API + "/" + currentDate;
  var cipher = crypto.createCipheriv(
    "AES-128-CBC",
    config.KEY_TOKEN_API,
    config.IV
  );
  var accessToken =
    cipher.update(token, "utf8", "base64") + cipher.final("base64");
  if (accessToken) {
    console.log("\n---------ACCESS TOKEN---------\n");
    console.log(accessToken);
    console.log("\n-------FINAL ACCESS TOKEN-------\n");
    res.status(200).send({ code: 100, "X-AC-Access-Token": accessToken });
  } else {
    console.log("Error to generate the Tokens");
    res
      .status(400)
      .send({ code: 102, message: "Error to generate the Tokens" });
  }
};

exports.getAuthToken = function(req, res, next) {
  // $access_token = $this->input->get_request_header('X-AC-Access-Token');
  // $validacion_access = $this->jwt->decode_access_token($access_token);
  var access_token = req.headers["x-ac-access-token"];
  var decode = crypto.createDecipheriv(
    "AES-128-CBC",
    config.KEY_TOKEN_API,
    config.IV
  );
  var validacion_access =
    decode.update(access_token, "base64", "utf8") + decode.final("utf8");
  if (validacion_access) {
    var authToken = module.exports.createToken(validacion_access);
    console.log("\n---------AUTH TOKEN---------\n");
    console.log(authToken);
    console.log("\n-------FINAL AUTH TOKEN-------\n");
    res.status(200).send({ code: 100, "X-AC-Auth-Token": authToken });
  } else {
    console.log("Error with the Tokens");
    res.status(200).send({ code: 102, message: "Error with the Tokens" });
  }
};

exports.createToken = function(access_token) {
  // TOKEN OPTIONS
  var content = {
    iat: moment().unix(),
    nbf: moment().unix(),
    exp: moment()
      .add(1, "hour")
      .unix(),
    data: {
      uid: access_token
    }
  };
  return jwt.encode(content, config.SECRET_API);
};

// Auth
exports.isAuth = function(req, res, next) {
  if (!req.headers["x-ac-auth-token"]) {
    return res
      .status(403)
      .send({ message: "You don't have Autorization Token" });
  }
  var token = req.headers["x-ac-auth-token"].replace(/['"]+/g, "");
  try {
    var data = jwt.decode(token, config.SECRET_API);
    if (data.exp <= moment().unix()) {
      return res.status(401).send({ message: "The token is expired" });
    }
    console.log("\n---------TOKEN---------\n");
    console.log(token);
    console.log("DATA: ");
    console.log(data);
    console.log("\n-------FINAL TOKEN-------\n");
    return res.status(200).send({ data: data });
  } catch (ex) {
    return res.status(401).send({ message: "Token invalid" });
  }
  // next Action....
  next();
};

// Auth
exports.isAuthPrymary = function(req, res, next) {
  if (!req.headers["x-ac-auth-token"]) {
    return res
      .status(403)
      .send({ message: "You don't have Autorization Token" });
  }
  var token = req.headers["x-ac-auth-token"].replace(/['"]+/g, "");
  try {
    var data = jwt.decode(token, config.SECRET_API);
    if (data.exp <= moment().unix()) {
      return res.status(401).send({ message: "The token is expired" });
    }
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
