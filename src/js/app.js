import './lib/polyfills';
import * as Tools from './tools';
import SoundEvents from './core/SoundEvents';
import AudioManager from './core/AudioManager';
import SoundControl from './core/SoundControl';

// In modern versions of Chrome, you can’t have videos autoplay with sound enabled by default.
// You need to add the muted property to your HTML5 tag:
// muted="muted"

AudioManager.play('background.wav', {
	loop: true,
	volume: 0.1,
	muted: 'muted'
});

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
