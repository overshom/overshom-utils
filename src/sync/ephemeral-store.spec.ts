import { EphemeralStore } from '.'
import { sleep } from '../async'

describe('ephemeral store', () => {
    const ONE_SECOND = 1e3

    it(`should remove values after ${ONE_SECOND}ms`, async () => {
        const key = 'key'
        const store = new EphemeralStore<boolean, string>({
            lifetime: ONE_SECOND
        })
        store.set(key, true)
        await sleep(ONE_SECOND * .1)
        expect(store.get(key)).toMatchObject({ value: true })
        await sleep(ONE_SECOND)
        expect(store.get(key)).toBe(undefined)
    })
})