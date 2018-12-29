/**
 * Прокрутка элемента вверх
 * @param {Element} el Контейнер для прокрутки
 */
function scrollPageToTop(el) {
	el = el || document.documentElement;

	function getScroll() {
		return el.scrollTop;
	}
	
	function run() {
		if (getScroll() > 0) {
			el.scrollBy(0, -Math.max((getScroll() / 6), 1));
			requestAnimationFrame(run);
		}
	}
	run();
}
export default scrollPageToTop;
