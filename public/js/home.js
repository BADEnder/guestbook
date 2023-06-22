const animationStore = {}

const form = document.querySelector("#form")
const header = document.querySelector("header")
const main = document.querySelector("main")
const footer = document.querySelector("footer")
let toggleIndex = true


// Function to lock the window
function lockWindow(boolean=true) {

    let result 
    if(boolean) {
        result = 'none'
    } else {
        result = ''
    }
    main.style.userSelect = result
    // main.style.webkitUserSelect = result
    // main.style.MozUserSelect = result
    main.style.pointerEvents = result

    header.style.userSelect = result
    // header.style.webkitUserSelect = result
    // header.style.MozUserSelect = result
    header.style.pointerEvents = result
    
    footer.style.userSelect = result
    // footer.style.webkitUserSelect = result
    // footer.style.MozUserSelect = result
    footer.style.pointerEvents = result
    
}
  
const toggleForm = function () {
    if (toggleIndex) {
        form.style.display = 'flex'
        header.style.opacity = 0.5
        main.style.opacity = 0.5
        footer.style.opacity = 0.5
        toggleIndex = false
        lockWindow(true)
    } else {
        form.style.display = 'none'
        header.style.opacity = 1
        main.style.opacity = 1
        footer.style.opacity = 1
        toggleIndex = true
        lockWindow(false)
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
            totalPage: 2,
            page: 1,
            content: [],
            toggleIndex: true,

        }
    },
    template:
    `
        <section class="content-part col">
            <div class="col-3 col-md-6 col-sm-12" v-for="(item, index) in content">
                <div class="m-2 p-3 card ">
                    <div class="h3 mb-3">{{item.title}}</div>
                    <hr>
                    <div class="my-3">{{item.name}} said:</div>
                    <div class="break-text ms-5">{{item.content}}</div>
                </div>
            </div>
        </section>

        <section class="pages-bar">
            <div>
                <button id="pre-but" class="indicator" @click=previousPage> &lt; </button>
                <span>  <span >{{page}}</span> / <span>{{totalPage}}</span> </span>
                <button id="next-but" class="indicator" @click=nextPage> &gt; </button>
            </div>
        </section>

    `,
    methods: {
        getContent: async function (targetPage=this.page, itemNumber=12) {

            let url = `/api/content?targetPage=${targetPage}&itemNumber=${itemNumber}`
            const f = await fetch(url,  {
                method: "GET",
                // GET method cannot use the body part IN Fetch API.
                // headers: {
                //     "Content-Type": "application/json"
                // },
                // body: JSON.stringify({
                //     targetPage: targetPage,
                //     itemNumber: itemNumber
                // })
            })
            const res = await f.json()
            this.content = res.data
            this.totalPage = res.totalPage

        },
        checkPageButtonAvaliabale: function() {
            const previousButton = document.querySelector('#pre-but')
            const nextButton = document.querySelector('#next-but')
            if (this.page <= 1) {
                previousButton.disabled = true      
            } else {
                previousButton.disabled = false
            } 

            if (this.page >= this.totalPage) {
                nextButton.disabled = true
            } else {
                nextButton.disabled = false
            }

        },
        nextPage: function () {
            this.page += 1
            this.getContent()
            this.checkPageButtonAvaliabale()
        }, 
        previousPage: function () { 
            this.page -= 1
            this.getContent()
            this.checkPageButtonAvaliabale()
        }

    },
    compute: {

    },
    mounted: function () {
        this.getContent(targetPage=this.page)
        this.checkPageButtonAvaliabale()
        // console.log(this.totalPage)
    }
})

homeVue.mount('.third-section')


