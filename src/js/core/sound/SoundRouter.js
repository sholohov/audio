import {
	Howl
} from '../../lib/howler';
import SoundEvents from './SoundEvents';
import SoundControl from './SoundControl';

export default (function SoundRouter() {
	const THIS = {};
	
	THIS.init = function() {
		SoundEvents.init();
		SoundControl.init();
		background();
	};

	function getPath() {
		if (/github/.test(location.href)) {
			return '/audio/build/sounds/';
		} else {
			return '/sounds/';
		}
	}

	function background() {
		const sound = new Howl({
			src: [getPath() + 'background.mp3'],
			loop: true,
			volume: 0.1,
			autoplay: true
		});
	}

	return THIS;
})();
