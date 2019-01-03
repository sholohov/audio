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

	function getPath() {
		if (/github/.test(location.href)) {
			return '/audio/build/sounds/';
		} else {
			return '/sounds/';
		}
	}

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

		audio.addEventListener('loadeddata', () => {
			isLoded = true;
			setVolume(audio, SoundControl.getRangeValue());
			if (audio.loop) {
				audio.muted = false;
			}
			audio.preload = true;
			audio.autoplay = true;
			let playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.then(() => {}).catch(error => {
					console.warn(error);
				});
			}
			addToList(src, audio);
			console.dir(audio);
		}, false);

		// In modern versions of Chrome, you can’t have audios autoplay with sound enabled by default.
		// You need to add the muted property to your HTML5 tag:
		// muted="muted"
		if (audio.loop) {
			audio.muted = true;
		}

		audio.src = getPath() + src;
	};

	return THIS;
})();
