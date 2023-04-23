const pgConnect = require('./pgConection')


const all_query = {
    query1: 
    `
    CREATE TABLE IF NOT EXISTS members (
        user_id bigserial PRIMARY KEY,
        username character varying(50) UNIQUE,
        password character varying (255),
        name character varying(100) UNIQUE,
        email character varying(100),
        refresh_token character varying (255)
    )
    `,
    query2: 
    `
    CREATE TABLE IF NOT EXISTS guestbook (
        guestbook_id bigserial PRIMARY KEY,
        title character varying(100),
        content text,
        user_id bigint REFERENCES members(user_id) ON UPDATE CASCADE
    )
    `,
    query3: 
    `
    CREATE TABLE IF NOT EXISTS replybook (
        replybook_id bigserial PRIMARY KEY,
        message text,
        user_id bigint REFERENCES members(user_id) ON UPDATE CASCADE,
        guestbook_id bigint REFERENCES guestbook(guestbook_id) ON UPDATE CASCADE
    )
    `
}

const main = async () => {

try {
    for (let key in all_query) {
        let item = all_query[key]
        await pgConnect(item)
    }
} catch (err) {
    console.log(err)
}

}


module.exports = main