function untoggleClassOnAllTabs() {
    TabList.forEach((tab) => {
        tab.classList.remove('current')
    })
}

TabList = document.querySelectorAll('.tab');
// console.log(tabList);

TabList.forEach((tab) => {
    tab.addEventListener("click", () => {
        untoggleClassOnAllTabs();
        tab.classList.add('current');
    })
})