const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/authController");

authRouter.route("/login").post(authController.login);
authRouter.route("/signup").post(authController.signup);
authRouter.route("/users").get(authController.getAllUsers);

module.exports = authRouter;