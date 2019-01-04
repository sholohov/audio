import {
	Howl
} from '../../lib/howler';

/**
 * Обработка событий и воспроизведение звуков
 */
export default (function SoundEvents() {
	const THIS = {};
	const soundList = {};
	let isMouseDown = false;

	THIS.init = function() {
		THIS.body = document.body;
		mouseDownListener();
		hoverListener();
	};

	function getPath() {
		if (/github/.test(location.href)) {
			return '/audio/build/sounds/';
		} else {
			return '/sounds/';
		}
	}

	function handler(prop) {
		let src = prop.src[0];
		if (!soundList[src]) {
			soundList[src] = new Howl(prop);
		} else {
			soundList[src].play();
		}
	};

	function mouseDownListener() {
		THIS.body.addEventListener('mousedown', (e) => {
			isMouseDown = true;
			setTimeout(() => {
				isMouseDown = false;
			}, 0);
			let t = e.target;
			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-press-src]')) {
					THIS.currentElement = t;
					let src = t.dataset.soundPressSrc || '';
					let volume = t.dataset.soundPressVolume || 1;
					handler({
						src: [getPath() + src],
						volume: volume,
						autoplay: true
					});
					return;
				}
				if (t) t = t.parentNode;
			}
		});
	};
	
	function hoverListener() {
		THIS.body.addEventListener('mouseover', (e) => {
			if (THIS.currentElement) return;
			let t = e.target;
			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-hover-src]')) {
					THIS.currentElement = t;
					let src = t.dataset.soundHoverSrc || '';
					let volume = t.dataset.soundHoverVolume || 1;
					handler({
						src: [getPath() + src],
						volume: volume,
						autoplay: true
					});
					return;
				}
				if (t) t = t.parentNode;
			}
		});
		
		THIS.body.addEventListener('mouseout', (e) => {
			if (!THIS.currentElement || isMouseDown) return;
			let rt = e.relatedTarget;
			while (rt && rt !== THIS.body) {
				if (rt === THIS.currentElement) return;
				if (rt) rt = rt.parentNode;
			}
			THIS.currentElement = null;
		});
	};
	
	return THIS;
})();
