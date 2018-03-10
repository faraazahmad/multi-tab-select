TabList = Array.from(document.querySelectorAll('.tab'));
TabWrapper = document.querySelector('.tab-wrapper');

NewTabButton = document.querySelector("#new-tab-button");

let selectedTabs = [];
// TabList[0].classList.add('current');

function selectOnlyCurrentTab(targetTab) {
	selectedTabs.forEach((tab) => {
		tab.classList.remove('current');
	})
	targetTab.classList.add('current');
	selectedTabs = [];
	selectedTabs.push(targetTab);
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
});

// bad code, needs refactoring
NewTabButton.addEventListener("click", () => {
	let closeButton = document.createElement('a');
	let closeIcon = document.createTextNode('x');
	closeButton.classList.add('close-button');
	closeButton.appendChild(closeIcon);
	closeButton.addEventListener("click", () => {
		let tab = closeButton.parentElement;
		if(tab.classList.contains('current')) {
			// delete all selected tabs
			selectedTabs.forEach((tab) => {
				tab.classList.remove('current');
				let index = TabList.indexOf(tab);
				TabList.splice(index, 1);

				// finally delete the tab
				tab.parentNode.removeChild(tab);
			})
		}
		else {
			// delete only current tab
			let index = TabList.indexOf(tab);
			TabList.splice(index, 1);

			tab.parentElement.removeChild(tab);
		}

		// following block doesn't work yet
		if(TabList.length > 0) {
			let lastTab = TabList[TabList.length - 1];
			selectOnlyCurrentTab(lastTab);
		}
	})

	let newTab = document.createElement('div');
	let text = document.createTextNode('New Tab');

	newTab.appendChild(text);
	newTab.classList.add('tab');
	newTab.appendChild(closeButton);

	newTab.addEventListener("click", () => {
		if (isCtrlPressed) {
			toggleCurrentTab(newTab);
		}
		else if (isShiftPressed) {
			toggleShiftSelect(newTab);
		}
		else {
			selectOnlyCurrentTab(newTab);
		}
	})
	selectOnlyCurrentTab(newTab);

	TabWrapper.appendChild(newTab);
	TabList.push(newTab);
})