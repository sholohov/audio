import './lib/polyfills';
import * as Tools from './tools';
import SoundEvents from './core/SoundEvents';
import AudioManager from './core/AudioManager';
import SoundControl from './core/SoundControl';

// import Cursor from './core/cursor';
AudioManager.play('background.wav', { loop: true, volume: 0.1});
// setTimeout(() => {
// 	AudioManager.play('background-2.wav', { loop: true, volume: 0.1});
// }, 1000);

document.addEventListener('DOMContentLoaded', () => {
	// Sound effects
	SoundEvents.init();
	SoundControl.init();
});

window.addEventListener('load', () => {
	
});
