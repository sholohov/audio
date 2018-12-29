/**
 * Делегирование события.
 * Функция создаёт по одному экземпляру слушателя на событе и вызывает в цикле все подписки на него.
 * @param {String} eventType Строка, представляющая тип прослушиваемого события.
 * @param {String} selector СSS селектор элемента на котором сработает событие
 * @param {Function} listener Объект, который принимает уведомление, когда событие указанного типа произошло. Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript.
 */

export default function eventDelegation(eventType, selector, listener, arg1, arg2) {
	let body = document.body;
	
	if (!body) {
		console.warn('eventDelegation(): can\'t find body element');
		return;
	}

	if (!eventDelegation.list[selector]) {
		eventDelegation.list[selector] = [];
	}

	eventDelegation.list[selector].push(listener);

	if (!body._eventDelegationListener) {
		body._eventDelegationListener = {};
	}
	
	if (!body._eventDelegationListener[eventType]) {
		body.addEventListener(eventType, (e) => {
			let t = e.target;
			
			while (t && t !== body) {
				for (const key in eventDelegation.list) {
					const elementArr = eventDelegation.list[key];
					if (t.matches(key)) {
						elementArr.forEach(callback => {
							callback(e);
						});
					}
					return;
				}
				if (t) t = t.parentElement;
			}
		}, arg1, arg2);

		body._eventDelegationListener[eventType] = true;
	}
}
eventDelegation.list = {};
