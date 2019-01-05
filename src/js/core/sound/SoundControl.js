// import AudioManager from './AudioManager';
import { Howl, Howler } from '../../lib/howler';

/**
 * Управление звуком, например громкостью
 */
export default (function SoundControl() {
	const THIS = {};

	THIS.init = function() {
		THIS.volumeRangeElem = document.querySelector('.js-volume-range');
		THIS.volumeMuteBtnElem = document.querySelector('.js-volume-mute-btn');
		muteButton();
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
		const elem = THIS.volumeRangeElem;
		if (!elem) {
			console.warn('SoundControl(): can\'t find range element by class="js-volume-range"');
			return;
		}
		elem.addEventListener('input', (e) => {
			Howler.volume(e.target.value / 100);
		});
	};
	
	function muteButton() {
		const elem = THIS.volumeMuteBtnElem;
		if (!elem) {
			console.warn('SoundControl(): can\'t find range element by class="js-volume-mute-btn"');
			return;
		}

		Howler.mute(elem.classList.contains('is-disable'));

		elem.addEventListener('click', () => {
			let isDisable = elem.classList.toggle('is-disable');
			Howler.mute(isDisable);
		});
	}

	return THIS;
})();
