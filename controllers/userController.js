const pgConfig = require('../database/pgConfig')
const bcrypt = require('bcrypt')

const getUser = (req, res) => {
    res.status(200).json({
        msg: `${req.session.user}`
    })

    console.log(req.session.user)
}

const postUser = async (req, res) => {

    try {
        if (!req.body.username || !req.body.password) return res.sendStatus(406)

        let query = `SELECT * FROM members WHERE username = '${req.body.username}'`
    
        const client1 = pgConfig()
        await client1.connect()
        let result = await client1.query(query)
        await client1.end()
        let data = result.rows
        
        if (data[0]) {
            return res.status(403).json({
                msg: "The username already exist."
            })
        }

        query = `SELECT * FROM members WHERE name = '${req.body.name}'`

        const client2 = pgConfig()
        await client2.connect()
        result = await client2.query(query)
        await client2.end()
        data = result.rows

        if (data[0]) {
            return res.status(403).json({
                msg: "The name already exist."
            })
        }
    
        const pwdHashed = await bcrypt.hash(req.body.password, 10)
        const client3 = pgConfig()
        await client3.connect()
        
        let columns = `(username, password, name, email)`
        let values = `('${req.body.username}', '${pwdHashed}', '${req.body.name}', '${req.body.email}')`
        query = `INSERT INTO members ${columns} VALUES ${values}`
    
        await client3.query(query)
        await client3.end()
    
        res.status(200).json({
            msg: "Submit Successs!"
        })
    } catch (err) {
        console.log(err)
        return res.status(500)
    }


}

const putUser = async (req, res) => {

    try {

        if (!req.session.user) {
            return res.sendStatus(401)
        } 

        if (!req.body.oldPassword || !req.body.newPassword) {
            return res.sendStatus(403).json({
                msg: "No passwords"
            })
        }
    
        let query = 
        `
            SELECT * FROM members WHERE user_id = '${req.session.user.split(' ')[0]}'
        `
    
        const client1 = pgConfig()
        await client1.connect()
        let result = await client1.query(query)
        await client1.end()
        let data = result.rows 
    
        let match = await bcrypt.compare(req.body.oldPassword, data[0]['password'])
        // let match = true
        if (match) {
            const passwordHashed = await bcrypt.hash(req.body.newPassword, 10)
            query = 
            `
                UPDATE MEMBERS
                SET password = '${passwordHashed}'
                WHERE user_id = '${req.session.user.split(' ')[0]}'
            `
            console.log(query)

            const client2 = pgConfig()
            await client2.connect()
            await client2.query(query)
            await client2.end()

            res.status(200).json({
                msg: "The change is successful."
            })
            
        } else {
            return res.status(403).json({
                msg: "Old password is wrong!"
            })
        }

    } catch (error) {

        console.log(error)
        return res.sendStatus(500).json({
            msg: "Server Error."
        })

    }

}


module.exports = {
    getUser,
    postUser,
    putUser
}