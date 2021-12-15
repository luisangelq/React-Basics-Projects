const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,

    },
    downloads: {
        type: Number,
        default: 1,

    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    }



});

module.exports = mongoose.model('Link', linkSchema);