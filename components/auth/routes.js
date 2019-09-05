"use strict";
var express = require("express");
var api = express.Router();
var ControllerV1 = require("./v1/Controller");
var userMiddleware = require("../../middleware/auth");

// AUTH Routes
api.get("/v1/auth/get-access-token", userMiddleware.getAccessToken);
api.get("/v1/auth/get-auth-token", userMiddleware.getAuthToken);
api.get("/v1/auth/check-token", userMiddleware.isAuth);
// Optional
api.get("/v1/auth/get-access-token-service", userMiddleware.authWithUrl);

// Example Login
api.get("/v1/auth/login", userMiddleware.isAuthPrymary, ControllerV1.login);

module.exports = api;
