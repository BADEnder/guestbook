require('dotenv').config()
const path = require('path')
const http = require('http')
const https = require('https')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')

const app = express()
const app_http = express()

const {logRecord} = require('./middleware/logMiddleware')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const verifyLogIn = require('./middleware/verifyLogIn')

const corsOptions = require('./config/corsOptions')
const sessionOptions = require('./config/sessionOptions')
// const httpsOptions = require('./config/httpsOptions')

// Hostname and Port
const IP = process.env.IP || '127.0.0.1'
const HTTPS_PORT = process.env.HTTPS_PORT || 443 
const HTTP_PORT= process.env.HTTP_PORT || 80

// Basic middleware from express.js
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(session(sessionOptions))
app.use('/', express.static(path.join(__dirname, 'public')))

// First middlewares 
app.use(logRecord)
app.use(cors(corsOptions))

// Webisites - no authentication
app.use('/log-in', require('./routes/web/logInRoute'))
app.use('/sign-up', require('./routes/web/signUpRoute'))

// APIs - no authentication
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/user', require('./routes/api/userRoute'))
app.use('/api/content', require('./routes/api/contentRoute'))
app.use('/api/replyContent', require('./routes/api/replyContentRoute'))


// Second middlewares - verification
app.use(verifyJWT.verifyJWT)
app.use(verifyLogIn)

// Websites
app.use('/', require('./routes/web/homeRoute'))
app.use('/setting', require('./routes/web/settingRoute'))

// APIs
app.use('/api/log-out', require('./routes/api/logOutRoute'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({
            msg: '404 Not Found'
        })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

// Dev deplyment without SSL
app.listen(HTTP_PORT, () => {
    console.log(`Server is running at port:${HTTP_PORT}`)
})

/* 
//  Formal deployment with https if you have SSL certification.
 app_http.all('*', (req, res) => {
     res.redirect(307,`https://${process.env.DOMAIN_NAME}${req.url}`)
 })

 http.createServer(app_http).listen(80, () => {
     console.log(`Server is running at PORT: ${HTTP_PORT}, but it's redirecting to ${HTTPS_PORT}`)
 })

 https.createServer(httpsOptions, app).listen(443, () => {
     console.log(`Server is running at PORT: ${HTTPS_PORT}`)
 })

*/