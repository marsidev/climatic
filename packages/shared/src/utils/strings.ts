declare global {
  interface String {
    removeDiacritics: (replaceWith?: string) => string
    removeSpecialChars: (replaceWith?: string) => string
    removeSpaces: (replaceWith?: string) => string
  }
}

String.prototype.removeDiacritics = function (replaceWith: string = '') {
  return this.normalize('NFD').replace(/[\u0300-\u036f]/g, replaceWith)
}

String.prototype.removeSpecialChars = function (replaceWith: string = '') {
  return this.replace(/[^a-z0-9,. ]/g, replaceWith)
}

String.prototype.removeSpaces = function (replaceWith: string = '') {
  return this.replace(/ /g, replaceWith)
}

export { }
