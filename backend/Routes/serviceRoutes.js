const express = require("express");
const serviceRouter = express.Router();
const serviceController = require("../Controllers/serviceController");

serviceRouter.route("/")
    .get(serviceController.getAllServices)
    .post(serviceController.createService);

serviceRouter.route("/:id")
    .get(serviceController.getService)
    .patch(serviceController.updateService)
    .delete(serviceController.deleteService);

module.exports = serviceRouter;