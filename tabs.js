function untoggleClassOnAllTabs() {
    TabList.forEach((tab) => {
        tab.classList.remove('current')
    })
}

TabList = document.querySelectorAll('.tab');

document.addEventListener("keydown", (key) => {
    if (key.keyCode == 17) {
        TabList.forEach((tab) => {
            tab.addEventListener("click", () => {
                // untoggleClassOnAllTabs();
                tab.classList.add('current');
            })
        }) 
    }
    else {
        TabList.forEach((tab) => {
            tab.addEventListener("click", () => {
                untoggleClassOnAllTabs();
                tab.classList.add('current');
            })
        })
    }
})