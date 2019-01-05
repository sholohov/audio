import {
	Howl
} from '../../lib/howler';

/**
 * Обработка событий и воспроизведение звуков
 */
export default (function SoundEvents() {
	const THIS = {};
	const _soundList = {};
	let _hoverElement = null;
	let _isMouseDown = false;

	THIS.init = function() {
		THIS.body = document.body;
		mouseDownListener();
		hoverListener();
	};

	THIS.setHoverElement = function(elem) {
		_hoverElement = elem;
	};

	THIS.getHoverElement = function() {
		return _hoverElement;
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
		if (!_soundList[src]) {
			_soundList[src] = new Howl(prop);
		} else {
			_soundList[src].play();
		}
	};

	function mouseDownListener() {
		THIS.body.addEventListener('mousedown', (e) => {
			_isMouseDown = true;
			setTimeout(() => {
				_isMouseDown = false;
			}, 0);
			let t = e.target;
			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-press-src]')) {
					_hoverElement = t;
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
			if (_hoverElement) return;
			let t = e.target;
			while (t && t !== THIS.body) {
				if (t && t.matches('[data-sound-hover-src]')) {
					_hoverElement = t;
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
			if (!_hoverElement || _isMouseDown) return;
			let rt = e.relatedTarget;
			while (rt && rt !== THIS.body) {
				if (rt === _hoverElement) return;
				if (rt) rt = rt.parentNode;
			}
			_hoverElement = null;
		});
	};
	
	return THIS;
})();
