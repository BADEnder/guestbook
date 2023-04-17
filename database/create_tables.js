const pgConnect = require('./pg-conection')


const main = () => {


let query1 = 
`
    CREATE TABLE IF NOT EXISTS members (
        username character varying(255) PRIMARY KEY,
        password character varying (255),
        refresh_token character varying (255)
    )
`

// let query2 = 
// `
//     CREATE TABLE IF NOT EXISTS guestbook (
//         guestbook_id bigserial PRIMARY KEY,
//         message text,
//     )
// `

// let query3 = 
// `
//     CREATE TABLE IF NOT EXISTS replybook (
//         replybook_id bigserial PRIMARY KEY,
//         message text,
//     )
// `

pgConnect(query1)
// pgConnect(query2)
// pgConnect(query3)


}


module.exports = main