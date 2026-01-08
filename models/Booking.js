const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip',
            required: true
        },
        totalSeats: {
            type: Number,
            required: true,
            min: 1
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
            default: 'PENDING'
        },
        payment: {
            method: {
                type: String,
                enum: [
                    'CARD',
                    'UPI',
                    'NETBANKING',
                    'PAYPAL',
                    'GIFT_CARD',
                    'PAY_LATER'
                ]
            },
            transactionId: {
                type: String
            },
            paidAt: {
                type: Date
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
