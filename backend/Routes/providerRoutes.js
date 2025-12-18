const express = require("express");
const providerRouter = express.Router();
const serviceController = require("../Controllers/serviceController");

// Provider can manage their services
providerRouter.route("/services")
    .post(serviceController.createService);

module.exports = providerRouter;