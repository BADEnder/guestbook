const userStorage = {} 

const initStore= async () => {
    const f = await fetch('/api/user', {
        method: "GET"
    })

    const data = await f.json()
    
    userStorage.user_id = data.msg.split(' ')[0]
    userStorage.name = data.msg.split(' ')[1]

}

initStore()