const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// Create new booking
router.post('/', async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});

module.exports = router;
