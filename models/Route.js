const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
    {
        fromCity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
            required: true
        },
        toCity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
            required: true
        },
        distance: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

routeSchema.index(
    { fromCity: 1, toCity: 1 },
    { unique: true }
);

module.exports = mongoose.model('Route', routeSchema);