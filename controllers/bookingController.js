const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const User = require('../models/User');
const Bus = require('../models/Bus');

// /api/bookings

exports.createBooking = async (req, res) => {
    try {
        const { tripId, userId, totalSeats } = req.body;
        if (!tripId || !userId || !totalSeats) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (totalSeats > trip.totalSeats) {
            return res.status(400).json({ error: "Total seats cannot exceed the trip's total seats" });
        }
        const totalAmount = totalSeats * trip.price;
        const booking = await Booking.create({ trip: tripId, user: userId, totalSeats, totalAmount });
        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .populate({
            path: 'trip',
            populate: {
                path: 'bus',
                select: 'busNumber busType operatorName'
            }
        })
        .populate({
            path: 'trip',
            populate: {
                path: 'route',
                populate: {
                    path: 'fromCity',
                    select: 'name state'
                }
            }
        })
        .populate({
            path: 'trip',
            populate: {
                path: 'route',
                populate: {
                    path: 'toCity',
                    select: 'name state'
                }
            }
        })
        .populate('user', 'name email');
        if (bookings.length === 0) {
            return res.status(404).json({ error: "No bookings found" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        booking.status = 'CONFIRMED';
        await booking.save();
        res.status(200).json({
            message: "Booking confirmed successfully",
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        booking.status = 'CANCELLED';
        await booking.save();
        res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};