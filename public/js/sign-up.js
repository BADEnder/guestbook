const headerNav = document.querySelector('header nav')
const menuBut = document.querySelector('.nav-menu-but')

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const passwordAgain = document.querySelector('#password-again')

const submit = document.querySelector('#submit')

headerNav.style.display = 'none'
menuBut.style.display = 'none'

const submitSignUp = async () => {

    
    if (!username.value) {
        alert('Username is required')
    } else if (!password.value) {
        alert('Password is required')
    } else if (!name.value) {
        alert('Name is required')
    } else if (!email.value) {
        alert('Email is required')
    } else if (password.value !== passwordAgain.value) {
        alert('The password is different, please retype.')
    }
    else {
        console.log("what up?")
        console.log(username.value)
        console.log(password.value)
        const f = await fetch('/api/user',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                name: name.value,
                email: email.value
            })
        })

        const data = await f.json()
        if (f.status != 200) {
            alert(`${data.msg}`)
        } else {
            alert(`${data.msg}`)
            window.location = "/log-in"
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
        passwordAgain.focus()
    }
})

passwordAgain.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submit.click()
    }
})
