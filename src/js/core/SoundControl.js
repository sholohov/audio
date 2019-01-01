import AudioManager from './AudioManager';

function rng(v, a, b) {
	return Math.min(Math.max(v, a), b);
}

/**
 * Управление звуком, например громкостью
 */
export default (function SoundControl() {
	const THIS = {};

	THIS.init = function() {
		THIS.volumeRangeElem = document.querySelector('.js-volume-range');
		setRangeValues();
		volumeRange();
	};

	/**
	 * Получить значение ползунка громкости
	 */
	THIS.getRangeValue = function() {
		return THIS.volumeRangeElem.value;
	};

	function setRangeValues() {
		THIS.volumeRangeElem.max = 1;
		THIS.volumeRangeElem.min = 0;
		THIS.volumeRangeElem.sep = 0.01;
	}

	function volumeRange() {
		if (!THIS.volumeRangeElem) {
			console.warn('SoundControl(): can\'t find range element by class="js-volume-range"');
			return;
		}
		THIS.volumeRangeElem.addEventListener('input', (e) => {
			let t = e.target;
			let audioList = AudioManager.getList();

			for (const key in audioList) {
				const audio = audioList[key];
				if (!audio.hasOwnProperty('_defaultVolume')) {
					audio._defaultVolume = audio.volume || 1;
				}
				let volume = rng(t.value - (1 - audio._defaultVolume), 0, 1.0);
				volume = +volume.toFixed(2);
				audio.volume = volume;
			}
		});
	};

	return THIS;
})();
