const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({

    date: {type: Number},
    mood:{
        type: String,
        enum: ['', '', '', '', '', '', '', '', '', ''], default: ''
    },
    journal: { type: String },
    tags: { type: String },
    moodScale: { type: Number, min: 1, max: 10 },
}, { createAt: true },
)


module.exports = mongoose.model('Entry', runSchema)  