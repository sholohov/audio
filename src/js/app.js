import './lib/polyfills';
import * as Tools from './tools';
import sound from './core/sound';
import playAudio from './core/playAudio';

// import Cursor from './core/cursor';
playAudio('Линда - Сделай так.wav', { loop: true, volume: 0.1});

document.addEventListener('DOMContentLoaded', () => {
	// Sound effects
	sound();
});

window.addEventListener('load', () => {
	
});
