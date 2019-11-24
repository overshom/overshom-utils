import { randi } from '.'

describe('randi', () => {
    it('should generate integer', () => {
        const n = randi(0, 9)
        expect(Number.isInteger(n)).toBe(true)
    })
})