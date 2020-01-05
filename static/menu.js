let tabHeader = document.querySelectorAll('.tabHeader');

tabHeader.forEach((button) => {
	button.onclick = changeTab;
});

function changeTab(){
	let numberTab = this.dataset.tab;
	numberTab = parseInt(numberTab);

	document.querySelector('.active').classList.remove('active');
	this.classList.add('active')

	changeTabSection(numberTab);

}


function changeTabSection(tabNumber){
	let currentTab = document.querySelector('.show');
	currentTab.classList.remove('show');
	currentTab.classList.add('hide');


	let getDisplay = document.getElementById('tabSection-' + tabNumber);

	getDisplay.classList.remove('hide')
	getDisplay.classList.add('show');
}