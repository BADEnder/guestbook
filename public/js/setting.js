
const col = document.querySelector('#name')

setTimeout(() => {
    col.value = userStorage.name
}, 500)



const changePwd = async () => {
    const oldPassword = document.querySelector("#old-password")
    const newPassword = document.querySelector("#new-password")
    const newPasswordAgain = document.querySelector("#new-password-again")

    if (!oldPassword.value) {
        alert("Old password is required!") 
    } else if (!newPassword.value) {
        alert("New password is required!") 
    } else if (!newPasswordAgain.value) {
        alert("Retype new password again is required!")
    } else if (newPassword.value != newPasswordAgain.value) {
        alert("New passwords are different.")
    } else {
        const f = await fetch('/api/user',  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                oldPassword: oldPassword.value,
                newPassword: newPassword.value
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


// const test_fun = () => {
//     const total_piece = prompt('請輸入份數')
//     const check_idx = confirm(`件號: A4702-000-B829\n總份數: ${total_piece}\n請確認?`)

//     console.log(total_piece)
//     console.log(typeof total_piece)
//     if (check_idx) {
//         alert('Success')

//     } else {
//         alert('OK, you loser')
//     }
// }