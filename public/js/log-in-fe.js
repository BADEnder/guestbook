const headerNav = document.querySelector('header nav')
const menuBut = document.querySelector('.nav-menu-but')

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const submit = document.querySelector('#submit')

headerNav.style.display = 'none'
menuBut.style.display = 'none'

const submitLogIn = async () => {

    if (!username.value) {
        alert('username is required')
    } else if (!password.value) {
        alert('password is required')
    } else {
        const f = await fetch('/api/auth',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        const data = await f.json()
        if (f.status != 200) {
            alert(`${data.msg}`)
        } else {
            alert(`${data.msg}`)
            window.location = "/"
        }

    }

}

username.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        password.focus()
    }
})


password.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submit.click()
    }
})
