// set up ======================================================================
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
let PORT = process.env.PORT || 6700;
const Entry = require('./models/entry.js')


// connect to MongoDb ======================================================================
const configURL = process.env.MONGODB_URI
mongoose.connect(configURL)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`)
})

mongoose.connection.on('error', (err) => {
    console.log('NOT != MongoDB:', err.message)
})


// express app ======================================================================
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// ----------------ROUTES---------------------// 

// GET ======================================================================
// ----- read all journal entries
app.get('/entries', (req, res) => {
    Entry.find()
        .then(entries => res.render('allEntries', { entries }))
        .catch(err => {
            res.status(500).send('Something went wrong')
        })

})

//------ shows the empty add form 
app.get('/entries/new', (req, res) => {
    res.render('add')
})


// //------- read one entry
app.get('/entries/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.redirect('/entries')
    }
    Entry.findById(req.params.id)
        .then(entry => {
            if (!entry) return res.redirect('/entries')
            res.render('oneEntry', { entry })
        })
        .catch(err => {
            console.log(err.message)
            res.redirect('/entries')
        })
})

// //------ read filled entry 
app.get('/entries/edit/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.redirect('/entries')
    }
    Entry.findById(req.params.id)
        .then(entry => {
            if (!entry) return res.redirect('/entries')
            res.render('edit', { entry })
        })
        .catch(err => {
            console.log(err.message)
            res.redirect('/entries')
        })
})


// POST =====================================================================

//----- create a new entry
app.post('/entries', (req, res) => {
    Entry.create(req.body)
        .then(() => res.redirect('/entries'))
        .catch(err => {
            console.log(err.message)
            res.redirect('/entries/new')
        })
})


// PUT ======================================================================
app.put('/entries/:id', (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body, {
        runValidator: true
    })
        .then(() => {
            res.json({ message: 'Updated' })
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({ error: err.message })
        })
})


// DELETE ======================================================================
app.delete('/entries/:id', (req, res) => {
    console.log('Deleting Entry:', req.params.id)
    Entry.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ message: 'Deleted' })
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        })
})

app.get('/', (req, res) => {
  res.redirect('/login');
});


// launch =======================================================================
app.listen(PORT, () => {
    console.log(`Server is BURING OIL on PORT ${PORT}`)
})