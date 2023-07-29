const pgConfig = require('../database/pgConfig')
const checkSQLInjection = require('../database/checkSQLInjection')

const getContent = async (req, res) => {
    const client1 = pgConfig()
    const client2 = pgConfig()
    
    let result = {}
    let query1, query2, targetPage, itemNumber

    if (!req.query.targetPage || !Number(req.query.targetPage)) {
        targetPage = 1
    } else {
        targetPage = Number(req.query.targetPage)
    }

    if ( !req.query.itemNumber || !Number(req.query.itemNumber)) {
        itemNumber = 10
    } else {
        itemNumber = Number(req.query.itemNumber)
    }

    query1 = 
    `
        SELECT a.*, b.name,
		(	
			SELECT COUNT(c.replybook_id)
			FROM replybook as c
		 	WHERE c.guestbook_id = a.guestbook_id
		) 
        AS reply_msg_number
        FROM guestbook AS a
        INNER JOIN members AS b
        ON a.user_id = b.user_id 

        OFFSET (${(targetPage -1) * itemNumber})
        LIMIT ${itemNumber}
    `


    query2 = 
    `
        SELECT count(*)
        FROM guestbook 
        
    `

    await client1.connect()
    const response1 = await client1.query(query1)
    result.data = response1.rows
    await client1.end()

    await client2.connect()
    const response2 = await client2.query(query2)
    
    const total = Number(response2.rows[0]['count'])
    result.totalPage = total % itemNumber == 0 
        ? total / itemNumber 
        : Number.parseInt( total/itemNumber) +1

    res.json(result)
    await client2.end()


    
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
        let values = `('${checkSQLInjection(req.body.title)}', '${checkSQLInjection(req.body.content)}', ${req.body.user_id})`
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