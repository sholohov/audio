import getScrollWidth from './getScrollWidth';

let header = null;
let body = null;
let scrollTop = 0;

export default function hideScroll(isHide) {
	// header = header || document.querySelector('#header');
	body = body || document.body;

	if (!body) {
		console.warn('Error: hideScroll()');
		return;
	}
	
	requestAnimationFrame(() => {
		if (isHide) {
			scrollTop = window.pageYOffset;
			window.document.documentElement.style.scrollBehavior = 'auto';
			body.style.top = -scrollTop + 'px';
			body.style.paddingRight = getScrollWidth() + 'px';
			if (header) {
				header.style.paddingRight = getScrollWidth() + 'px';
			}
			body.style.position = 'fixed';
			body.style.overflow = 'hidden';
			body.classList.add('open-modal');
		} else {
			body.style.position = '';
			body.style.overflow = '';
			body.classList.remove('open-modal');
			body.style.paddingRight = '';
			if (header) {
				header.style.paddingRight = '';
			}
			window.scrollTo(0, scrollTop);
			window.document.documentElement.style.scrollBehavior = '';
		}
	});
}
