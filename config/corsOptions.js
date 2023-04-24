const whitelist = [
    'https://127.0.0.1', 
    'http://127.0.0.1',
    'https://localhost', 
    'http://localhost',
]

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    optionSuccessStatus: 200
}


module.exports = corsOptions