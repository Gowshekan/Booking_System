const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../Controllers/bookingController");

bookingRouter.route("/")
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking);

bookingRouter.route("/:id")
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking);

bookingRouter.route("/user/:userId")
    .get(bookingController.getUserBookings);

bookingRouter.route("/provider/:providerId")
    .get(bookingController.getProviderBookings);

module.exports = bookingRouter;