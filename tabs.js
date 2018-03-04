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

let isCtrlPressed = false;

document.addEventListener("keydown", (key) => {
    if (key.keyCode == 17) {
        isCtrlPressed = true;
    }
});

document.addEventListener("keyup", (key) => {
    if (key.keyCode == 17) {
        isCtrlPressed = false;
    }
});

TabList.forEach((tab) => {
    tab.addEventListener("click", () => {
        if (isCtrlPressed) {
            toggleCurrentTab(tab);
        }
        else {
            selectOnlyCurrentTab(tab);
        }
    })
})