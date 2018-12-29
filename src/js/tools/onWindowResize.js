/**
 * Отслеживает изменение размеров окна браузера и вызывает cb если привысело время указанное в duration
 * @param {function} cb каллбэк
 * @param {number} [duration=300] интервал в миллисикундах
 */

function onWindowResize(cb, duration = 300) {
	let timeout;
	window.addEventListener('resize', function() {
		clearTimeout(timeout);
		timeout = setTimeout(cb, duration);
	});
}

export default onWindowResize;
