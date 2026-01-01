const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        state: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
);

citySchema.index(
    { name: 1, state: 1 },
    { unique: true }
);

module.exports = mongoose.model('City', citySchema);
