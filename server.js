require('dotenv').config()
const express = require('express')
const path = require('path')

const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

const {logRecord} = require('./middleware/logMiddleware')
const verifyJWT = require('./middleware/verifyJWT')

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}

// Basic middleware from express.js
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(session(sessionOptions))
app.use('/', express.static(path.join(__dirname, 'public')))

// First middlewares 
app.use(logRecord)

// Webisites - no authentication
app.use('/log-in', require('./routes/web/logInRoute'))
app.use('/sign-up', require('./routes/web/signUpRoute'))

// APIs - no authentication
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/user', require('./routes/api/userRoute'))

// Second middlewares - verification
app.use(verifyJWT.verifyJWT)

// Websites
app.use('/', require('./routes/web/homeRoute'))
app.use('/setting', require('./routes/web/settingRoute'))

// APIs
app.use('/api/content', require('./routes/api/contentRoute'))
app.use('/api/log-out', require('./routes/api/logOutRoute'))



const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`)
})