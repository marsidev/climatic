declare global {
	interface String {
		/** Replace diacritics from a string, by default it will replace with empty string.
     * @param {string} [replaceWith] - the string to replace the diacritics with
     */
		removeDiacritics: () => string

		/** Replace special characters from a string, by default it will replace with empty string.
     * @param {string} [replaceWith] - the string to replace the special characters with
     */
		replaceSpecialChars: (replaceWith?: string) => string

		/** Replace spaces from a string, by default it will replace with empty string.
     * @param {string} [replaceWith] - the string to replace the special characters with
     */
		replaceSpaces: (replaceWith?: string) => string

		/** Replace extra spaces from a string, by default it will replace with a single space.
     * @param {string} [replaceWith] - the string to replace the special characters with
     */
		replaceExtraSpaces: (replaceWith?: string) => string
	}
}

String.prototype.removeDiacritics = function () {
	return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

String.prototype.replaceSpecialChars = function (replaceWith = '') {
	return this.replace(/[^a-z0-9,. ]/g, replaceWith)
}

String.prototype.replaceSpaces = function (replaceWith = '') {
	return this.replace(/ /g, replaceWith)
}

String.prototype.replaceExtraSpaces = function (replaceWith = ' ') {
	return this.replace(/\s+/g, replaceWith).trim()
}

export { }
