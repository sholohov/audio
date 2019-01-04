import './lib/polyfills';
import * as Tools from './tools';
import SoundRouter from './core/sound/SoundRouter';

document.addEventListener('DOMContentLoaded', () => {
	SoundRouter.init();
});

window.addEventListener('load', () => {
});
