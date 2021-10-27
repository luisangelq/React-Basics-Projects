const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Project', Schema);