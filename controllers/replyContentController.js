const pgConfig = require('../database/pgConfig')
const checkSQLInjection = require('../database/checkSQLInjection')

const getReplyContent = async (req, res) => {
    const client = pgConfig()

    let result = {}
    let guestbook_id = req.query.guestbook_id

    let query = 
    `
    SELECT a.replybook_id, a.message, a.update_time, b.name
    FROM replybook AS a
    INNER JOIN members AS b
    ON a.user_id = b.user_id 
    WHERE a.guestbook_id = ${guestbook_id}
    ORDER BY replybook_id
    `

    
    await client.connect()
    const response = await client.query(query)
    result.data = response.rows
    await client.end()

    res.json(result)

}

const postReplyContent = async (req, res) => {
    try {
        if (!req.body.user_id) {
            return res.sendStatus(403)
        }
    
        if (!req.body.message) {
            return res.sendStatus(406)
        } 
        
        let columns = `(message, guestbook_id, user_id)`
        let values = `('${checkSQLInjection(req.body.message)}', ${req.body.guestbook_id}, ${req.body.user_id})`
        let query = `INSERT INTO replybook ${columns} VALUES ${values}`
        
        const client = pgConfig()
        await client.connect()
        await client.query(query)
        await client.end()

        res.status(200).json({
            msg: "Submit Success!",
        })

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}


module.exports = {
    getReplyContent,
    postReplyContent
}