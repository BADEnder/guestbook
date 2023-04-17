const headerTemplate = Vue.createApp({
    data: function () {
        return {
            url_list: [
                {
                    name: "Home",
                    url: "/"
                },
                {
                    name: "Member",
                    url: "/member"
                },
                {
                    name: "Log-Out",
                    url: "/log-out"
                }
            ]
        }
    },
    template: 
    `
    <div class="logo">GuestBook</div>
    <nav class="nav-menu">
        <div v-for="(item, index) in url_list">
            <a :href="item.url"> {{item.name}} </a>
        </div>
    </nav>
    
    <button class="nav-menu-but">
        <div class="nav-menu-icon">
    </button>
    `
})


headerTemplate.mount("#header")