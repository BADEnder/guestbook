require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if (!authHeader) {
        verifyRefreshToken(req, res, next)
        // return res.sendStatus(401)
    } else {
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    return res.sendStatus(403)
                } else {
                    next()
                }
    
            }
        )
    }

}


const verifyRefreshToken = async (req, res, next) => {
    if (!req.cookies || !req.cookies.jwt) {
        return res.redirect('/log-in')
    }

    const refreshToken = req.cookies.jwt
    // pg connect and find.
    const user = 'Ender'

    const accessToken = jwt.sign(
        {
            username: user
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m'}
    )

    req.headers['authorization'] = `Bearer ${accessToken}`
    next()
}


module.exports = verifyJWT