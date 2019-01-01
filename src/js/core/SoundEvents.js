import AudioManager from './AudioManager';

/**
 * Обработка событий и воспроизведение звуков
 */
export default (function SoundEvents() {
	const THIS = {};

	THIS.init = function() {
		THIS.body = document.body;
		mouseDownListener();
		hoverListener();
	};

	function pressHandler(elem) {
		let prop = {};
		let src = elem.dataset.soundPressSrc || '';
		let volume = elem.dataset.soundPressVolume || 1;
		prop.volume = volume;
		AudioManager.play(src, prop);
	};

	function hoverHandler(elem) {
		let prop = {};
		let src = elem.dataset.soundHoverSrc || '';
		let volume = elem.dataset.soundHoverVolume || 1;
		prop.volume = volume;
		AudioManager.play(src, prop);
	};

	function mouseDownListener() {
		THIS.body.addEventListener('mousedown', (e) => {
			let t = e.target;

			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-press-src]')) {
					THIS.currentElement = t;
					pressHandler(t);
					return;
				}
				if (t) t = t.parentNode;
			}
		});
	};

	function hoverListener() {
		THIS.body.addEventListener('mouseover', (e) => {
			let t = e.target;

			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-hover-src]')) {
					if (!THIS.currentElement) {
						hoverHandler(t);
						return;
					}
				}
				if (t) t = t.parentNode;
			}
		});

		THIS.body.addEventListener('mouseout', (e) => {
			let t = e.target;
			let rt = e.relatedTarget;

			// если нет элемента на котрый перешла мышь
			// значит неоткуда уходить,
			// останавливаем обработку события
			if (!rt) return;

			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-hover-src]')) {
					if (t === THIS.currentElement) {
						THIS.currentElement = null;
						return;
					}
				}

				if (t) t = t.parentNode;
			}
		});
	};

	return THIS;
})();
