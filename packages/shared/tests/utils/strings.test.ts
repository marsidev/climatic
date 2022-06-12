import '../../src/utils/strings'

describe('string prototype', () => {
  describe('replaceSpaces method', () => {
    describe('without replaceWith value', () => {
      it('can remove spaces', () => {
        const [str, replaceWith, expected] = ['New York', undefined, 'NewYork']
        const result = str.replaceSpaces(replaceWith)
        expect(result).toEqual(expected)
      })
    })

    describe('with replaceWith value', () => {
      it('can replace spaces', () => {
        const [str, replaceWith, expected] = ['New York', '-', 'New-York']
        const result = str.replaceSpaces(replaceWith)
        expect(result).toEqual(expected)
      })
    })
  })

  describe('replaceExtraSpaces method', () => {
    describe('without replaceWith value', () => {
      it('can remove extra spaces', () => {
        const [str, replaceWith, expected] = ['new             york', '', 'newyork']
        const result = str.replaceSpaces(replaceWith)
        expect(result).toEqual(expected)
      })
    })

    describe('with replaceWith value', () => {
      it('can replace extra spaces', () => {
        const [str, replaceWith, expected] = ['new             york', '-', 'new-------------york']
        const result = str.replaceSpaces(replaceWith)
        expect(result).toEqual(expected)
      })
    })
  })

  describe('replaceSpecialChars method', () => {
    describe('without replaceWith value', () => {
      it('can remove', () => {
        const [str, replaceWith, expected] = ['---new ?/york++', undefined, 'new york']
        const result = str.replaceSpecialChars(replaceWith)
        expect(result).toEqual(expected)
      })
    })

    describe('with replaceWith value', () => {
      it('can replace', () => {
        const [str, replaceWith, expected] = ['---new ?/york++', ' ', '   new   york  ']
        const result = str.replaceSpecialChars(replaceWith)
        expect(result).toEqual(expected)
      })
    })
  })

  describe('removeDiacritics method', () => {
    it('can remove diacritics', () => {
      const [str, expected] = ['üéáíóú', 'ueaiou']
      const result = str.removeDiacritics()
      expect(result).toEqual(expected)
    })
  })
})
