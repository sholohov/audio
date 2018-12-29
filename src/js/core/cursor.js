/**
 * To apply special cursor on element
 * add class "cursor-trgr" and data-cursor-type="{choose type}" to this element
 * Available types: default and 'plus'
 * To add new type add correct inline SVG  to cursor.pug
 * and specify styles in cursor.sass if needed
 */

export default class Cursor {
	constructor() {
		this.el = document.querySelector('.cursor');
		this.cursors = Array.from(this.el.querySelector('.cursor-elem'));
		this.defaultClass = 'cursor-default';
		this.el.style.display = 'block';
		this.initEvents();
	}

	initEvents() {
		const self = this;
		document.body.classList.add('no-cursor');
		window.addEventListener('mousemove', (ev) => this.handleMouseMove(ev));
		window.addEventListener('touchmove', (ev) => this.handleMouseMove(ev));

		$(document).on({
			mouseenter: function() {
				let type = $(this).data('cursor-type');
				self.el.classList.remove(self.defaultClass);
				self.el.classList.add('cursor-' + type);
			},
			mouseleave: function() {
				let type = $(this).data('cursor-type');
				self.el.classList.remove('cursor-' + type);
				self.defaultType();
			}
		}, '.cursor-trgr');
	}

	defaultType() {
		$(this.el).removeClassPrefix('cursor-');
		this.el.classList.add(this.defaultClass);
	}

	handleMouseMove(e) {
		const mousepos = getMousePos(e);
		const innerHeight = window.innerHeight;
		const innerWidth = window.innerWidth;

		if (
			mousepos.y <= 2 ||
			mousepos.y >= innerHeight - 2 ||
			mousepos.x <= 2 ||
			mousepos.x >= innerWidth - 2
		) {
			this.el.style.display = 'none';
		} else {
			this.el.style.display = 'block';
		}
		this.updatePos(mousepos);
	}

	updatePos(mousepos) {
		requestAnimationFrame(() => {
			this.el.style.transform = 'translateX(' + mousepos.x + 'px) translateY(' + mousepos.y + 'px)';
		});
	}
}

const getMousePos = (e) => {
	let posx = 0;
	let posy = 0;
	if (!e) {
		let e = window.event;
	};
	posx = e.clientX;
	posy = e.clientY;
	return {
		x: posx,
		y: posy
	};
};

$.fn.removeClassPrefix = function(prefix) {
	this.each(function(i, it) {
		var classes = it.className.split(' ').map(function(item) {
			return item.indexOf(prefix) === 0 ? '' : item;
		});
		it.className = classes.join(' ');
	});

	return this;
};

/**
 * Export function to use in third-party applications
 * example: Swiper on('touchMove') event
 */
export function handleMove(e) {
	const mousepos = getMousePos(e);
	const el = document.querySelector('.cursor');
	requestAnimationFrame(() => {
		el.style.transform = 'translateX(' + mousepos.x + 'px) translateY(' + mousepos.y + 'px)';
	});
}
