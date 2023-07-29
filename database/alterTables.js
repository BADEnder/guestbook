const pgConnect = require('./pgConection')


const all_query = {
    query1: 
    `
    BEGIN;
    ALTER TABLE replybook ADD COLUMN create_time timestamp DEFAULT NOW();
    ALTER TABLE replybook ADD COLUMN create_user character varying (100) DEFAULT 'SYSTEM';
    ALTER TABLE replybook ADD COLUMN update_time timestamp DEFAULT NOW();
    ALTER TABLE replybook ADD COLUMN update_user character varying (100) DEFAULT 'SYSTEM';
    COMMIT;
    `,
    query2: 
    `
    BEGIN;
    ALTER TABLE guestbook ADD COLUMN create_time timestamp DEFAULT NOW();
    ALTER TABLE guestbook ADD COLUMN create_user character varying (100) DEFAULT 'SYSTEM';
    ALTER TABLE guestbook ADD COLUMN update_time timestamp DEFAULT NOW();
    ALTER TABLE guestbook ADD COLUMN update_user character varying (100) DEFAULT 'SYSTEM';
    COMMIT;
    `,
    query3: 
    `
    BEGIN;
    ALTER TABLE members ADD COLUMN create_time timestamp DEFAULT NOW();
    ALTER TABLE members ADD COLUMN create_user character varying (100) DEFAULT 'SYSTEM';
    ALTER TABLE members ADD COLUMN update_time timestamp DEFAULT NOW();
    ALTER TABLE members ADD COLUMN update_user character varying (100) DEFAULT 'SYSTEM';
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
