const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const User = require('../models/User');
const mongoose = require('mongoose');
// /api/bookings

exports.createBooking = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { tripId } = req.body;
        const totalSeats = Number(req.body.totalSeats);
        const userId = req.user.id;
        if (!tripId || isNaN(totalSeats) || totalSeats <= 0) {
            return res.status(400).json({ error: 'Invalid request' });
        }
        
        const trip = await Trip.findOneAndUpdate(
            {
                _id: tripId,
                status: 'SCHEDULED',
                availableSeats: { $gte: totalSeats }
            },
            {
                $inc: {availableSeats: -totalSeats},
            },
            {
                new: true,
                session
            }
        );
        if (!trip) {
            return res.status(400).json({ error: 'Trip not found or insufficient seats' });
        }

        const totalAmount = trip.price * totalSeats;

        const booking = await Booking.create(
            [{
                trip: tripId,
                user: userId,
                totalSeats,
                totalAmount
            }],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Booking created successfully',
            booking: booking[0] // Return the first created booking
        })
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(400).send(error);
    }
};

exports.getBookings = async (req, res) => {
    try {
        let filter = {};
        if (req.user.role !== 'ADMIN') {
            filter.user = req.user.id; // Regular users can only see their own bookings
        }//admin can see all bookings {} which means all bookings(no filter)
        const bookings = await Booking.find(filter)
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
        if (booking.status === 'CANCELLED') {
            return res.status(400).json({ error: "Booking is already cancelled" });
        }
        const trip = await Trip.findById(booking.trip);
        if (trip) {
            trip.availableSeats += booking.totalSeats;
            await trip.save();
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