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

//---- date input for the edit page to appear in the calander/ date input
// toISOString()= is a date method that returns a string representing a date
//2026-20-21
entrySchema.virtual('inputDate').get(function () {
    return this.date.toISOString().slice(0,10)
}) 


module.exports = mongoose.model('Entry', entrySchema)  