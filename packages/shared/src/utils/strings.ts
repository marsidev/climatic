declare global {
  interface String {
    /** Replace diacritics from a string, by default it will replace with empty string.
     * @param {string} [replaceWith] - the string to replace the diacritics with
     */
    replaceDiacritics: (replaceWith?: string) => string

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

String.prototype.replaceDiacritics = function (replaceWith: string = '') {
  return this.normalize('NFD').replace(/[\u0300-\u036f]/g, replaceWith)
}

String.prototype.replaceSpecialChars = function (replaceWith: string = '') {
  return this.replace(/[^a-z0-9,. ]/g, replaceWith)
}

String.prototype.replaceSpaces = function (replaceWith: string = '') {
  return this.replace(/ /g, replaceWith)
}

String.prototype.replaceExtraSpaces = function (replaceWith: string = ' ') {
  return this.replace(/\s+/g, replaceWith).trim()
}

export { }
