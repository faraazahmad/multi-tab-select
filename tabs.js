TabList = document.querySelectorAll('.tab');

function selectOnlyCurrentTab(targetTab) {
    TabList.forEach((tab) => {
        tab.classList.remove('current');
    })
    targetTab.classList.add('current');
}

function toggleCurrentTab(targetTab) {
    targetTab.classList.toggle('current');
}

document.addEventListener("keydown", (key) => {
    if (key.keyCode == 17) {
        TabList.forEach((tab) => {
            tab.removeEventListener("click", selectOnlyCurrentTab(tab));
            tab.addEventListener("click", toggleCurrentTab(tab));
        })
    }
});

document.addEventListener("keyup", (key) => {
    if (key.keyCode == 17) {
        TabList.forEach((tab) => {
            tab.removeEventListener("click", toggleCurrentTab(tab));
            tab.addEventListener("click", selectOnlyCurrentTab(tab));
        })
    }
});