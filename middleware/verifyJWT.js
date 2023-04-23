require('dotenv').config()
const jwt = require('jsonwebtoken')
const pgConfig = require('../database/pgConfig')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if (!authHeader) {
        verifyRefreshToken(req, res, next)
    } else {
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    next()
                }
    
            }
        )
    }

}

const verifyRefreshToken = async (req, res, next) => {
    // console.log(req)
    // console.log(req.cookie)
    // console.log(req.cookies)
    // console.log(req.session)
    // console.log(req.session.test)
    // console.log(req.headers)
    // console.log(Object.keys(req))

    if (!req.cookies || !req.cookies.jwt) {
        // console.log("no cookies or jwt")
        return res.redirect('/log-in')
    }

    const refreshToken = req.cookies.jwt
    
    let query = 
    `
    SELECT * FROM members WHERE refresh_token = '${refreshToken}' 
    `

    // pg connect and find.
    const client1 = await pgConfig()
    await client1.connect()
    let result = await client1.query(query)
    await client1.end()

    let data = result.rows 

    if (!data[0]) {
        return res.redirect('/log-in')
    }


    const accessToken = jwt.sign(
        {
            username: data[0]['username']
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m'}
    )

    req.headers['authorization'] = `Bearer ${accessToken}`
    next()
}


module.exports = {
    verifyJWT,
    verifyRefreshToken
}