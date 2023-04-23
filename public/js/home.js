const animationStore = {}

const form = document.querySelector("#form")
const header = document.querySelector("header")
const main = document.querySelector("main")
const footer = document.querySelector("footer")
let toggleIndex = true

const toggleForm = function () {
    if (toggleIndex) {
        form.style.display = 'flex'
        header.style.opacity = 0.5
        main.style.opacity = 0.5
        footer.style.opacity = 0.5
        toggleIndex = false
    } else {
        form.style.display = 'none'
        header.style.opacity = 1
        main.style.opacity = 1
        footer.style.opacity = 1
        toggleIndex = true
    }
}

const submitContent = async() => {
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')

    console.log(title.value)
    console.log(content.value)
    console.log(userStorage.user_id)

    const f = await fetch('/api/content',  {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user_id: Number(userStorage.user_id),
        title: title.value.trim(),
        content: content.value.trim()
    })
    })

    const data = await f.json()
    if (f.status != 200) {
        alert(`${data.msg}`)
    } else {
        alert(`${data.msg}`)
        title.value = ''
        content.value = ''
        toggleForm()
        window.location = '/'
    }

}

const homeVue = Vue.createApp({
    data: function () {
        return {
            content: [],
            toggleIndex: true,
        }
    },
    template:
    `

        <div class="col-4 col-md-6 col-sm-12" v-for="(item, index) in content">
            <div class="m-2 p-3 card ">
                <div class="h3 mb-3">{{item.title}}</div>
                <hr>
                <div class="my-3">{{item.name}} said:</div>
                <div class="break-text ms-5">{{item.content}}</div>
            </div>
        </div>

    `,
    methods: {
        getContent: async function (targetPage=1) {
            const f = await fetch('/api/content',  {
                method: "GET",
                
            })
            const data = await f.json()
            this.content = data
        },
        
    },
    compute: {

    },
    mounted: function () {
        this.getContent(1)
    }
})

homeVue.mount('.third-section')



// const f = await fetch('/api/auth',  {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         username: username.value,
//         password: password.value
//     })
// })

// const data = await f.json()
// if (f.status != 200) {
//     alert(`${data.msg}`)
// } else {
//     alert(`${data.msg}`)
//     window.location = "/"
// }