"use strict";
var express = require("express");
var api = express.Router();
var ControllerV1 = require("./v1/Controller");
var userMiddleware = require("../../middleware/auth");

// AUTH Routes
api.get("/v1/auth/get-access-token", userMiddleware.getAccessToken);
api.get("/v1/auth/check-token", userMiddleware.isAuth);
api.get("/v1/auth/get-access-token-service", userMiddleware.authWithUrl);

// api.get("/v2/auth/register", userMiddleware.isAuthPrymary,ControllerV2.register);
// api.get("/v2/auth/checkemail/:email", ControllerV2.checkemail);
// api.post("/v2/auth/login", userMiddleware.isAuthPrymary, ControllerV2.login);
// api.get("/v2/auth/me", userMiddleware.isAuth, ControllerV2.me);
// api.put("/v2/auth/update-me", userMiddleware.isAuth, ControllerV2.updateme);
// api.put("/v2/auth/set-pass", userMiddleware.isAuth, ControllerV2.setPass);
// api.post("/v2/user/set-avatar", userMiddleware.isAuth, ControllerV2.setAvatar);
// api.get("/v2/auth/test", userMiddleware.isAuthPrymary);
// api.get("/v2/auth/gen-new-password/:email", ControllerV2.generateRandomPass);
// api.post("/v2/auth/push", ControllerV2.sendPush);
// api.get("/v2/notif-center/get-notifications", ControllerV2.getNotifications);
// api.get("/v2/cms/get-users", ControllerV2.getusers);

module.exports = api;
