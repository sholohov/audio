/**
 * Подписка на событие пользовательского интерфейса.
 * @param {string} evName имя События
 * @param {callback} cb каллбэк фукция
 */
function UIEvent(eventName, cb) {
	if (!UIEvent.listeners[eventName]) {
		UIEvent.listeners[eventName] = [];
	}
	if (UIEvent.listeners[eventName]) {
		UIEvent.listeners[eventName].push(cb);
		// console.log("UI Events:",'"' + eventName + '"', "is adeded");
	}
}
UIEvent.listeners = {};

/**
 * Отправка события пользовательского интерфейса
 * @param {string} evName имя события
 * @param {any} data данные в любом виде
 */
function dispatchUIEvent(eventName, data) {
	if (UIEvent.listeners[eventName]) {
		UIEvent.listeners[eventName].forEach(function(item) {
			item(data);
		});
	}
}

/**
 * Удаление подписки на событие пользовательского интерфейса
 * @param {string} evName имя События
 * @param {function} fu фунуция (которая использывалась при подписке)
 */
function removeUIEvent(eventName, fu) {
	if (UIEvent.listeners[eventName]) {
		UIEvent.listeners[eventName].forEach(function(item, i) {
			if (item === fu) {
				delete UIEvent.listeners[eventName][i];
				// console.log("UI Events:", '"' + eventName + '"', "is deleted");
			}
		});
	}
}

if (window) {
	window.UIEvent = UIEvent;
	window.dispatchUIEvent = dispatchUIEvent;
	window.removeUIEvent = removeUIEvent;
}

export {
	UIEvent, dispatchUIEvent, removeUIEvent
};
