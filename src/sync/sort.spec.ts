import { ascendingNum, descendingNum, ascendingStr, descendingStr, ascendingMapping, descendingMapping } from './sort'

describe('sorting order', () => {
    it('number ASC', () => {
        const numbers = [1, 5, 2, 9]
        const expected = [1, 2, 5, 9]
        const sorted = numbers.sort(ascendingNum)
        expect(sorted).toEqual(expected)
    })

    it('number DESC', () => {
        const numbers = [1, 5, 2, 9]
        const expected = [9, 5, 2, 1]
        const sorted = numbers.sort(descendingNum)
        expect(sorted).toEqual(expected)
    })

    it('string ASC', () => {
        const strings = ['i', 'am', 'iron', 'man']
        const expected = ['am', 'i', 'iron', 'man']
        const sorted = strings.sort(ascendingStr)
        expect(sorted).toEqual(expected)
    })

    it('string DESC', () => {
        const strings = ['i', 'am', 'iron', 'man']
        const expected = ['man', 'iron', 'i', 'am']
        const sorted = strings.sort(descendingStr)
        expect(sorted).toEqual(expected)
    })

    it('mapping ASC', () => {
        const strings = ['i', 'am', 'iron', 'man']
        const expected = ['i', 'am', 'man', 'iron']
        const sorted = strings.sort(ascendingMapping(v => v.length))
        expect(sorted).toEqual(expected)
    })

    it('mapping DESC', () => {
        const strings = ['i', 'am', 'iron', 'man']
        const expected = ['iron', 'man', 'am', 'i']
        const sorted = strings.sort(descendingMapping(v => v.length))
        expect(sorted).toEqual(expected)
    })
})
