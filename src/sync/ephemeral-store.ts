interface IEphemeralContainer<T> {
    value: T
    expire: number
}

const TWO_HOURS = 72e5
const FOUR_HOURS = TWO_HOURS * 2

/**
 * EphemeralStore is a Map-like structure with a value stored no longer than specified lifetime
 */
export class EphemeralStore<T = {}, K = string> {
    private readonly map: Map<K, IEphemeralContainer<T>>
    private lastGarbageCollectionTime: number

    constructor(
        public minimumGarbageCollectionDelay = TWO_HOURS,
        public defaultLifetime = FOUR_HOURS,
    ) {
        if (defaultLifetime <= minimumGarbageCollectionDelay) {
            throw new Error('EphemeralStore defaultLifetime should be bigger than GC delay')
        }
        this.map = new Map<K, IEphemeralContainer<T>>()
        this.lastGarbageCollectionTime = Date.now()
    }

    public set(key: K, value: T, lifetime = this.defaultLifetime): T {
        if (lifetime <= this.minimumGarbageCollectionDelay) {
            throw new Error('EphemeralStore value lifetime should be bigger than GC delay')
        }
        const EphemeralContainer = {
            expire: Date.now() + lifetime,
            value,
        }
        this.map.set(key, EphemeralContainer)
        return value
    }

    public get(key: K): IEphemeralContainer<T> | undefined {
        this.collectGarbage()
        const found = this.map.get(key)
        return found
    }

    public delete(key: K): void {
        this.map.delete(key)
    }

    private collectGarbage() {
        const now = Date.now()
        if (
            now - this.lastGarbageCollectionTime <
            this.minimumGarbageCollectionDelay
        ) {
            return
        }
        this.map.forEach((container, key) => {
            if (now > container.expire) {
                this.map.delete(key)
            }
        })
        this.lastGarbageCollectionTime = now
    }
}
