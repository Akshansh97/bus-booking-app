const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
    {
        busNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            match: [/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/,
                'required format is XX00XX0000']
        },
        busType: {
            type: String,
            enum: ['AC', 'Non-AC', 'Sleeper', 'Seater'],
            required: true
        },
        totalSeats: {
            type: Number,
            required: true,
            min: 1
        },
        operatorName: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

busSchema.index(
    { busNumber: 1 },
    { unique: true }
);

module.exports = mongoose.model('Bus', busSchema);