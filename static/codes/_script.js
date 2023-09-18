// MEGAMENU

const menu = document.querySelector('.menu');
const menuMain = menu.querySelector('.menu-main');
const goBack = menu.querySelector('.go-back');
const menuTrigger = document.querySelector('.mobile-menu-trigger');
const closeMenu = menu.querySelector('.mobile-menu-close');
let subMenu;
menuMain.addEventListener('click', (e) => {
	if (!menu.classList.contains('active')) {
		return;
	}
	if (e.target.closest('.menu-item-has-children')) {
		const hasChildren = e.target.closest('.menu-item-has-children');
		console.log(hasChildren);
		showSubMenu(hasChildren);
	}
});
goBack.addEventListener('click', () => {
	hideSubMenu();
});
menuTrigger.addEventListener('click', () => {
	toggleMenu();
});
closeMenu.addEventListener('click', () => {
	toggleMenu();
});
document.querySelector('.menu-overlay').addEventListener('click', () => {
	toggleMenu();
});

function toggleMenu() {
	menu.classList.toggle('active');
	document.querySelector('.menu-overlay').classList.toggle('active');
}

function showSubMenu(hasChildren) {
	subMenu = hasChildren.querySelector('.sub-menu');
	subMenu.classList.add('active');
	subMenu.style.animation = 'slideLeft 0.5s ease forwards';
	const menuTitle = hasChildren.firstChild.innerText;
	menu.querySelector('.current-menu-title').innerHTML = menuTitle;
	menu.querySelector('.mobile-menu-head').classList.add('active');
}

function hideSubMenu() {
	subMenu.style.animation = 'slideRight 0.5s ease forwards';
	setTimeout(() => {
		subMenu.classList.remove('active');
	}, 300);
	menu.querySelector('.current-menu-title').innerHTML = '';
	menu.querySelector('.mobile-menu-head').classList.remove('active');
}

window.onresize = function () {
	if (this.innerWidth > 991) {
		if (menu.classList.contains('active')) {
			toggleMenu();
		}
	}
};

// DISPLAY COLLECTION ITEMS (sidebar menu trigger)
const collection = document.querySelector('#collection');

function ifElExist(el) {
	if (el === null) {
		console.log('NOTE: DOM element doesn`t exist on this page');
		return;
	} else {
		const linksArr = Array.from(document.querySelectorAll('.sidebar-nav-link'));

		const rteArr = [...el.children];

		rteArr.forEach((item, idxA) => {
			// get sort order number
			const num = parseInt(item.querySelector('.order-num').innerHTML);
			// re-asign index number
			idxA = num; // now index start wit  number `1` nistead `0`
			// if index is bigger than `1` (first array item)
			if (idxA > 1) {
				// function  hide all items except first one
				hideElements(item);
			}
			displayItem(linksArr, idxA, item);
		});
	}
}

ifElExist(collection);
