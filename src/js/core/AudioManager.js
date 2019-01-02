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

	function setVolume(audio, value) {
		if (!audio.hasOwnProperty('_defaultVolume')) {
			audio._defaultVolume = audio.volume || 1;
		}
		let volume = rng(audio._defaultVolume / 100 * value, 0, 1);
		volume = Math.round(volume * 100) / 100;
		audio.volume = volume;
	}

	function addToList(src, audio) {
		list[src] = audio;
	}

	THIS.setAllAudioVolume = function(value) {
		let audioList = list;
		for (const key in audioList) {
			const audio = audioList[key];
			setVolume(audio, value);
		}
	};

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
				isLoded = true;
				audio._isEvent = true;
				setVolume(audio, SoundControl.getRangeValue());
				audio.play();
				audio.muted = false;
				addToList(src, audio);
			}, false);
		}
		
		if (/github/.test(location.href)) {
			audio.muted = true;
			audio.src = `/audio/build/sounds/${src}`;
		} else {
			audio.muted = true;
			audio.src = `/sounds/${src}`;
		}
	};
	
	return THIS;
})();
