import { shell } from '.'
import { ErrorShell } from './shell'

describe('shell', () => {
    it('should return "10" from node process logs', async () => {
        const res = await shell('node -e "console.log(5+5)"')
        expect(res).toBe('10\n')
    })

    it('should handle errors properly', async () => {
        try {
            await shell('node -e "033badsyntax033"')
            throw new Error()
        } catch (e) {
            expect(e).toBeInstanceOf(ErrorShell)
            expect(e.message).toContain('SyntaxError')
        }
    })
})