const mongoose = require('mongoose');
const _ = require('lodash');

const OptionsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const PollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
         required: true
    },
    options: [OptionsSchema],
    voters: [String]
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;