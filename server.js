require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()

const {logRecord} = require('./middleware/logMiddleware')
const verifyJWT = require('./middleware/verifyJWT')

// Basic middleware from express.js
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))

// First middlewares 
app.use(logRecord)

// Webisites
app.use('/log-in', require('./routes/web/log-in'))
app.use('/sign-up', require('./routes/web/sign-up'))

// Second middlewares - verification
app.use(verifyJWT)

// Websites
app.use('/', require('./routes/web/home'))
app.use('/member', require('./routes/web/member'))

// APIs


const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`)
})