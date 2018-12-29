export default class Debug {
	/**
     * Проверка на соответсвие имени хоста
     * @param {String|String[]} arr - добавление доверенных хостов
     * @returns boolean
     */
	static isLocal(arr) {
		let locals = ['localhost', '192.168', 'herokuapp', 'github'];
		let concatArr = locals.concat(arr);
		let currentHostname = (location && location.hostname) ? location.hostname : false;
		return concatArr.some((hostname) => currentHostname.indexOf(hostname));
	};
}
