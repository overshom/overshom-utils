import { createRetryable } from './retryable'

describe('retryable', () => {
    it('should retry 3 times', async () => {
        let count = 3
        const retryable = createRetryable({ attempts: count })

        const result = await retryable(async () => {
            count--
            if (count > 0) {
                throw new Error()
            }
            return true
        })
        expect(result).toBe(true)
    })

    it('should exhaust all attempts', async () => {
        let count = 3
        const retryable = createRetryable({ attempts: count - 1 })

        try {
            await retryable(async () => {
                count--
                if (count > 0) {
                    throw new Error()
                }
            })
            throw new Error()
        } catch (e) {
            expect(e.message).toContain('attempts exhausted')
        }
    })
})