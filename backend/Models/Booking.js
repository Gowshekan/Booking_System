const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
        required: [true, "Booking must be for a service"]
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Booking must have a customer"]
    },
    provider: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Booking must have a provider"]
    },
    date: {
        type: Date,
        required: [true, "Booking date is required"]
    },
    time: {
        type: String,
        required: [true, "Booking time is required"]
    },
    address: {
        type: String,
        required: [true, "Service address is required"]
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
        default: "pending"
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"]
    }
}, {
    timestamps: true
});

bookingSchema.pre(/^find/, function(next) {
    this.populate({
        path: "service",
        select: "title category price duration"
    }).populate({
        path: "customer",
        select: "name email phone"
    }).populate({
        path: "provider",
        select: "name email phone"
    });
    next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;