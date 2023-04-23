const pgConfig = require('../database/pgConfig')

const getContent = async (req, res) => {
    const client = pgConfig()
    
    let body = req.body
    let query 

    // if (!body) {
        // query = 
        // `
        //     SELECT a.*, b.replybook_id
        //     FROM guestbook AS a
        //     LEFT JOIN replybook AS b
        //     ON a.guestbook_id = b.guestbook_id
        // `
        query = 
        `
            SELECT a.*, b.name
            FROM guestbook AS a
            INNER JOIN members AS b
            ON a.user_id = b.user_id 
        `
    // }

    // console.log(query)

    await client.connect()
    const response = await client.query(query)
    const data = response.rows
    res.json(data)
    await client.end()
    
}

const postContent = async(req, res) => {
    try {
        if (!req.body.user_id) {
            return res.sendStatus(403)
        }
    
        if (!req.body.title || !req.body.content) {
            return res.sendStatus(406)
        } 
    
        let columns = `(title, content, user_id)`
        let values = `('${req.body.title}', '${req.body.content}', ${req.body.user_id})`
        let query = `INSERT INTO guestbook ${columns} VALUES ${values}`
        
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
    getContent,
    postContent
}