
const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    qrCode: {
        type: String,
    },
    services: [
        {
            name: String,
            price: Number,
            description: String,
            image: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Business', businessSchema);
