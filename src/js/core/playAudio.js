export default function playAudio(name, props) {
	const audio = new Audio;
	let isError = false;
	let isLoded = false;
	
	audio.addEventListener('error', () => {
		console.warn('playAudio(): Can\'t find ' + name);
		isError = true;
	}, false);

	if (isError) return;

	if (!playAudio._soundList) {
		playAudio._soundList = {};
	}

	if (!playAudio._soundList[name]) {
		playAudio._soundList[name] = audio;
	}
	
	if (props) {
		for (const key in props) {
			if (props.hasOwnProperty(key)) {
				const element = props[key];
				audio[key] = element;
			}
		}
	}
	
	if (!audio._isEvent) {
		audio.addEventListener('loadeddata', () => {
			console.dir(audio);
			audio.play();
			isLoded = true;
			audio._isEvent = true;
		}, false);
	}
	
	audio.src = `/sounds/${name}`;
}
