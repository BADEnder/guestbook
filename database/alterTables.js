const pgConnect = require('./pgConection')


const all_query = {
    query1: 
    `
    BEGIN;
    ALTER TABLE replybook ADD create_time timestamp DEFAULT NOW();
    ALTER TABLE replybook ADD create_user character varying (100) DEFAULT 'SYSTEM';
    ALTER TABLE replybook ADD update_time timestamp DEFAULT NOW();
    ALTER TABLE replybook ADD update_user character varying (100) DEFAULT 'SYSTEM';
    COMMIT;
    `,
    query2: 
    `
    BEGIN;
    ALTER TABLE guestbook ADD create_time timestamp DEFAULT NOW();
    ALTER TABLE guestbook ADD create_user character varying (100) DEFAULT 'SYSTEM';
    ALTER TABLE guestbook ADD update_time timestamp DEFAULT NOW();
    ALTER TABLE guestbook ADD update_user character varying (100) DEFAULT 'SYSTEM';
    COMMIT;
    `,
    query3: 
    `
    BEGIN;
    ALTER TABLE members ADD create_time timestamp DEFAULT NOW();
    ALTER TABLE members ADD create_user character varying (100) DEFAULT 'SYSTEM';
    ALTER TABLE members ADD update_time timestamp DEFAULT NOW();
    ALTER TABLE members ADD update_user character varying (100) DEFAULT 'SYSTEM';
    COMMIT;
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

main()
