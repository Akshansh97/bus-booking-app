const mongoose = require('mongoose');

const bookedSeatSchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip',
            required: true
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        seatNumber: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

bookedSeatSchema.index(
    { trip: 1, seatNumber: 1 },
    { unique: true }
);

module.exports = mongoose.model('BookedSeat', bookedSeatSchema);
