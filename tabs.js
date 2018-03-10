TabList = Array.from(document.querySelectorAll('.tab'));

let selectedTabs = [];

function selectOnlyCurrentTab(targetTab) {
    TabList.forEach((tab) => {
        tab.classList.remove('current');
    })
    selectedTabs = [];
    selectedTabs.push(targetTab);
    targetTab.classList.add('current');
}

function toggleCurrentTab(targetTab) {
    targetTab.classList.toggle('current');
    if(targetTab.classList.contains('current')) {
        selectedTabs.push(targetTab);
    }
    else {
        let index = selectedTabs.indexOf(targetTab);
        selectedTabs.splice(index, 1);
    }
}

function toggleShiftSelect(targetTab) {
    let lastInSelectedList = selectedTabs[selectedTabs.length - 1];
    let startIndex = TabList.indexOf(lastInSelectedList);
    let endIndex = TabList.indexOf(targetTab);

    if(startIndex > endIndex) {
        for(let i = startIndex - 1; i >= endIndex; i--) {
            toggleCurrentTab(TabList[i]);
        }
    }
    else if(endIndex > startIndex) {
        for(let i = startIndex + 1; i <= endIndex; i++) {
            toggleCurrentTab(TabList[i]);
        }
    }
}

let isCtrlPressed = false,
    isShiftPressed = false;

document.addEventListener("keydown", (key) => {
    if (key.keyCode == 17) {
        isCtrlPressed = true;
    }
    isShiftPressed = key.shiftKey;
});

document.addEventListener("keyup", (key) => {
    if (key.keyCode == 17) {
        isCtrlPressed = false;
    }
    isShiftPressed = key.shiftKey;
});

TabList.forEach((tab) => {
    tab.addEventListener("click", () => {
        if (isCtrlPressed) {
            toggleCurrentTab(tab);
        }
        else if (isShiftPressed) {
            toggleShiftSelect(tab);
        }
        else {
            selectOnlyCurrentTab(tab);
        }
    })
})