import SoundControl from './SoundControl';

function rng(v, a, b) {
	return Math.min(Math.max(v, a), b);
}

/**
 * Управление Audio API
 */

export default (function AudioManager() {
	const THIS = {};
	const list = {};

	function setVolume(audio) {
		if (!audio.hasOwnProperty('_defaultVolume')) {
			audio._defaultVolume = audio.volume || 1;
		}
		console.log(SoundControl.getRangeValue());
		let volume = rng(SoundControl.getRangeValue() - (1 - audio._defaultVolume), 0, 1.0);
		volume = +volume.toFixed(2);
		audio.volume = volume;
	}

	/**
	 * Получить список текущих обектов
	 */
	THIS.getList = function() {
		return list;
	};
	
	/**
	 * Воспроизвести файл
	 * @param {string} src
	 * @param {object} props
	 */
	THIS.play = function(src, props) {
		const audio = new Audio;
		let isError = false;
		let isLoded = false;

		audio.addEventListener('error', () => {
			console.warn('Audio(): Can\'t find ' + src);
			isError = true;
		}, false);
		
		if (isError) return;

		if (props) {
			for (const key in props) {
				const element = props[key];
				audio[key] = element;
			}
		}
		
		if (!audio._isEvent) {
			audio.addEventListener('loadeddata', () => {
				setVolume(audio);
				audio.play();
				isLoded = true;
				list[src] = audio;
				audio._isEvent = true;
			}, false);
		}
		
		audio.src = `/sounds/${src}`;
	};
	
	return THIS;
})();
