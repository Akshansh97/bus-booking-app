const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
            required: true
        },
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bus',
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['SCHEDULED', 'CANCELLED', 'COMPLETED'],
            default: 'SCHEDULED'
        }
    },
    { timestamps: true }
);

tripSchema.index(
    { bus: 1, departureTime: 1 },
    { unique: true }
);

module.exports = mongoose.model('Trip', tripSchema);
