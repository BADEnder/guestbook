require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const pgConfig = require('../database/pgConfig')
// const fsPromise = require('fs').promises


const getAuth = () => {
    return null
}

const postAuth = async (req, res) => {

    try {
        const username = req.body.username
        const password = req.body.password
        if (!username || !password) {
            return res.status(400).json({
                msg: "Username or Password is required"
            })
        }
        
        let query = 
        `
        SELECT * 
        FROM members
        WHERE username = '${username}'
        `

        
        const client1 = pgConfig()
        await client1.connect()
        let result = await client1.query(query)
        await client1.end()

        let data = result.rows
        
        if (!data[0]) {
            return res.status(403).json({
                msg: 'There is no this username.'
            })
        }

        const match = await bcrypt.compare(password, data[0]['password'])
        // const match = true

        if (match) {
            // create JWT
            const accessToken = jwt.sign(
                { username: username },
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '30m' }
            )
            const refreshToken = jwt.sign(
                { username: username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )


            query = 
            `
            UPDATE members
            SET refresh_token = '${refreshToken}'
            WHERE username = '${username}'
            `

            const client2 = pgConfig()
            await client2.connect()
            await client2.query(query)
            await client2.end()
            
            req.session.user = `${data[0]['user_id']} ${data[0]['name']}`
            // req.session.user_id = data[0]['user_id']
            // req.session.name = data[0]['name']
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 3600* 1000})
            res.status(200).json({
                msg: "Login Success!",
                accessToken
            })
            
        } else {
            res.status(403).json( {
                msg: "Login Failed"
            })
        }
    
    } catch (err) {
        console.log(err)
        return res.sendStatus(500).json( {
            msg: "Server Error."
        })
    }
    
}

module.exports = {
    getAuth,
    postAuth
}


