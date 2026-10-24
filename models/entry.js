const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({

    date: { type: Date },
    mood: {
        type: String,
        enum: ["great", "good", "calm", "okay", "low", "anxious", "overwhelmed", "rough"],
        default: 'okay'
    },
    journal: { type: String },
    tags: { type: String },
    moodScale: { type: Number, min: 1, max: 10 },
}, { timestamps: true },
// force the plural of entry 
    { collection: 'entries' }
)


//virtual = calculate feilds, not saved in the db
//---- date display (10,21/2026)
entrySchema.virtual('displayDate').get(function () {
    return this.date.toLocaleDateString('en-US', { timeZone: 'UTC' })
})


module.exports = mongoose.model('Entry', entrySchema)  