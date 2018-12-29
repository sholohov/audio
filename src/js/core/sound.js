import playAudio from './playAudio';

export default function sound() {
	const body = document.body;
	
	function pressHandler(elem) {
		let prop = {};
		let src = elem.dataset.soundPressSrc || '';
		let volume = elem.dataset.soundPressVolume || 1;
		prop.volume = volume;
		playAudio(src, prop);
	}
	
	function hoverHandler(elem) {
		let prop = {};
		let src = elem.dataset.soundHoverSrc || '';
		let volume = elem.dataset.soundHoverVolume || 1;
		prop.volume = volume;
		playAudio(src, prop);
	}

	// mousedown
	body.addEventListener('mousedown', (e) => {
		let t = e.target;

		while (t && t !== body) {
			if (t && t.matches('[data-sound-press-src]')) {
				pressHandler(t);
				return;
			}
			if (t) t = t.parentNode;
		}
	});
	
	// hover
	let currentElement = null;
	body.addEventListener('mouseover', (e) => {
		let t = e.target;
		
		while (t && t !== body) {
			if (t && t.matches('[data-sound-hover-src]')) {
				if (!currentElement) {
					currentElement = t;
					hoverHandler(t);
				}
				return;
			}
			if (t) t = t.parentNode;
		}
	});

	body.addEventListener('mouseout', (e) => {
		let t = e.target;
		
		while (t && t !== body) {
			if (t && t.matches('[data-sound-hover-src]')) {
				if (t === currentElement) {
					currentElement = null;
					return;
				}
			}

			if (t) t = t.parentNode;
		}
	});
}
