const animationStore = {}

const commentForm = document.querySelector("#commentForm")
// const replyForm = document.querySelector("#replyForm")
const replyDetail = document.querySelector("#reply-detail")
const replyDetailMsg = document.querySelector("#reply-detail-msg")

const header = document.querySelector("header")
const main = document.querySelector("main")
const footer = document.querySelector("footer")

let toggleIndex = true
let toggleReplyIndex = true
let toggleReplyDetailIndex = true
let target_guestbook_id = null
let global_content = []

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
  
const toggleCommentForm = function () {
    if (toggleIndex) {
        commentForm.style.display = 'flex'
        header.style.opacity = 0.5
        main.style.opacity = 0.5
        footer.style.opacity = 0.5
        toggleIndex = false
        lockWindow(true)
    } else {
        commentForm.style.display = 'none'
        header.style.opacity = 1
        main.style.opacity = 1
        footer.style.opacity = 1
        toggleIndex = true
        lockWindow(false)
    }
}


function toggleReplyFormG () {
    if (toggleReplyIndex) {
        replyForm.style.display = 'flex'
        header.style.opacity = 0.5
        main.style.opacity = 0.5
        footer.style.opacity = 0.5
        toggleReplyIndex = false
        lockWindow(true)
    } else {
        replyForm.style.display = 'none'
        header.style.opacity = 1
        main.style.opacity = 1
        footer.style.opacity = 1
        toggleReplyIndex = true
        lockWindow(false)
    }

}
  

function toggleReplyDetailG () {
    if (toggleReplyDetailIndex) {
        replyDetail.style.display = 'flex'
        header.style.opacity = 0.5
        main.style.opacity = 0.5
        footer.style.opacity = 0.5
        toggleReplyDetailIndex = false
        lockWindow(true)
    } else {
        replyDetail.style.display = 'none'
        header.style.opacity = 1
        main.style.opacity = 1
        footer.style.opacity = 1
        toggleReplyDetailIndex = true
        lockWindow(false)
    }

}
  


const submitContent = async() => {
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')

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
        togglecommentForm()
        window.location = '/'
    }

}

const submitReplyContent = async() => {
    const message = document.querySelector('#reply-content')

    const f = await fetch('/api/replyContent',  {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: message.value.trim(),
        guestbook_id: Number(target_guestbook_id),
        user_id: Number(userStorage.user_id),
    })
    })


    const data = await f.json()
    if (f.status != 200) {
        alert(`${data.msg}`)
    } else {
        alert(`${data.msg}`)
        message.value = ''
        toggleReplyFormG()
        window.location = '/'
    }

}

const homeVue = Vue.createApp({
    data: function () {
        return {
            totalPage: 2,
            page: 1,
            content: [],
            replyContent: [],
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
                    <div class="msg-fun-but">
                        <button @click="toggleReplyDetail(item.guestbook_id, item.reply_msg_number)" class="show-reply-msg" :id="item.guestbook_id"> {{item.reply_msg_number}} message </button>
                        <button @click="toggleReplyForm(item.guestbook_id)" class=""> Reply </button>
                    </div>
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
            // global_content = this.content
            this.totalPage = res.totalPage

        },
        getReply: async function (guestbook_id) {
            let url = `/api/replyContent?guestbook_id=${guestbook_id}`
            const f = await fetch(url, {
                method: "GET"
            })

            const res = await f.json()
            const data = res.data

            let result = ''
            for (let index=0; index<data.length; index ++) {
                let item = data[index]
                result += 
                `   


                    <div class="m-2 p-3 card-reply">
                        <h3> No. ${index+1}</h3>
                        <div class="my-3">${item.name} said:</div>
                        <div class="break-text ms-5">${item.message}</div>
                    </div>
                `
            }
            replyDetailMsg.innerHTML = result
            // this.replyContent = res.data
        },
        toggleReplyForm: function (guestbook_id) {
            target_guestbook_id = guestbook_id
            if (toggleReplyIndex) {
                replyForm.style.display = 'flex'
                header.style.opacity = 0.5
                main.style.opacity = 0.5
                footer.style.opacity = 0.5
                toggleReplyIndex = false
                lockWindow(true)
            } else {
                replyForm.style.display = 'none'
                header.style.opacity = 1
                main.style.opacity = 1
                footer.style.opacity = 1
                toggleReplyIndex = true
                lockWindow(false)
            }

        },

        toggleReplyDetail: async function (guestbook_id, reply_msg_number) {
            if (toggleReplyDetailIndex && reply_msg_number > 0) {
                await this.getReply(guestbook_id)
                replyDetail.style.display = 'flex'
                header.style.opacity = 0.5
                main.style.opacity = 0.5
                footer.style.opacity = 0.5
                toggleReplyDetailIndex = false
                lockWindow(true)
            } else {
                replyDetail.style.display = 'none'
                header.style.opacity = 1
                main.style.opacity = 1
                footer.style.opacity = 1
                toggleReplyDetailIndex = true
                lockWindow(false)
            }

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
    }
})

homeVue.mount('.third-section')


