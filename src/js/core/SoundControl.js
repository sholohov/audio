import AudioManager from './AudioManager';

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
		THIS.volumeRangeElem.max = 100;
		THIS.volumeRangeElem.min = 0;
		THIS.volumeRangeElem.step = 1;
	}

	function volumeRange() {
		if (!THIS.volumeRangeElem) {
			console.warn('SoundControl(): can\'t find range element by class="js-volume-range"');
			return;
		}
		THIS.volumeRangeElem.addEventListener('input', (e) => {
			AudioManager.setAllAudioVolume(e.target.value);
		});
	};

	return THIS;
})();
