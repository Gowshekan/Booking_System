const express = require("express");
const authRoutes = require("./Routes/authRoutes");
const serviceRoutes = require("./Routes/serviceRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const providerRoutes = require("./Routes/providerRoutes");

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/providers", providerRoutes);

// Health check
app.get("/", (req, res) => {
    console.log('Health check requested');
    res.json({
        status: "success",
        message: "Booking System API is running",
        timestamp: new Date().toISOString()
    });
});

// Test endpoint
app.get("/test", (req, res) => {
    res.json({
        status: "success",
        message: "Backend is connected and working"
    });
});

module.exports = app;