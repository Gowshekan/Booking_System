const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Service title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Service description is required"]
    },
    category: {
        type: String,
        required: [true, "Service category is required"],
        enum: ["Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", "Repair"]
    },
    price: {
        type: Number,
        required: [true, "Service price is required"],
        min: [0, "Price cannot be negative"]
    },
    duration: {
        type: Number,
        required: [true, "Service duration is required"],
        min: [15, "Duration must be at least 15 minutes"]
    },
    provider: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Service must belong to a provider"]
    },
    serviceArea: {
        type: String,
        required: [true, "Service area is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot be more than 5"]
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

serviceSchema.pre(/^find/, function(next) {
    this.populate({
        path: "provider",
        select: "name email phone"
    });
    next();
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;