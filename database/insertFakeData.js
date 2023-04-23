const pgConection = require('./pgConection')
const bcrypt = require('bcrypt')


const genHashedPWD = (pwd) => {
    return bcrypt.hashSync(pwd, 10)
}

// Fake user
const userList = [
    {
        'username': 'ender777',
        'password': genHashedPWD('789'),
        'name': 'Ender',
        'email': 'e777@gmail.com'
    }, 
    {
        'username': 'cindy999',
        'password': genHashedPWD('456'),
        'name': 'Cindy',
        'email': 'null'
    }, 
    {
        'username': 'test1',
        'password': genHashedPWD('123'),
        'name': 'testUser',
        'email': 'test123@gmail.com'
    }
]
// console.log(userList)

// Fake content
const guestbookList = [
    {
        'title': 'Todays Weather',
        'content': 'Not Bad. \n Just feel sick.',
        'user_id': '7',
    }, 
    {
        'title': 'Tomorrow',
        'content': 'I got to move forward fast more.',
        'user_id': '7',
    }, 
    {
        'title': 'Hm...',
        'content': 'I just fake user.\t Nothing I got to say.',
        'user_id': '8',
    }, 

]

const mainMembers = async () => {

    try {
        let columns = `(username, password, name, email)`
        for (let idx in userList) {
            let item = userList[idx]
            let values = `('${item.username}', '${item.password}', '${item.name}', '${item.email}')`
            let query = `INSERT INTO members ${columns} VALUES ${values}`
            
            // console.log(query)
            pgConection(query)
        }
    } catch (err) {
        console.log(err)
    }

}

const mainGuestbook = async () => {

    try {
        let columns = `(title, content, user_id)`
        for (let idx in guestbookList) {
            let item = guestbookList[idx]
            let values = `('${item.title}', '${item.content}', ${item.user_id})`
            let query = `INSERT INTO guestbook ${columns} VALUES ${values}`
            
            console.log(query)
            pgConection(query)
        }
    } catch (err) {
        console.log(err)
    }

}


// mainMembers()

// mainGuestbook()