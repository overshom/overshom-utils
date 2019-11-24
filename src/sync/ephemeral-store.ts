interface IEphemeralContainer<T> {
    value: T
    readonly expire: number
}

const FOUR_HOURS = 144e5
const ALMOST_ONE = .99

/**
 * EphemeralStore is a Map-like structure with a value stored no longer than specified lifetime
 */
export class EphemeralStore<T = unknown, K = string> {
    public readonly map: Map<K, IEphemeralContainer<T>>
    public readonly minimumGarbageCollectionDelay: number
    public readonly lifetime: number
    private lastGarbageCollectionTime: number

    constructor({
        lifetime,
        minimumGarbageCollectionDelay,
    }: {
        lifetime?: number
        minimumGarbageCollectionDelay?: number
    }
    ) {
        this.lifetime = lifetime ?? FOUR_HOURS
        this.minimumGarbageCollectionDelay = minimumGarbageCollectionDelay ?? this.lifetime * ALMOST_ONE
        if (this.lifetime <= this.minimumGarbageCollectionDelay) {
            throw new Error('EphemeralStore lifetime should be bigger than GC delay')
        }
        this.map = new Map<K, IEphemeralContainer<T>>()
        this.lastGarbageCollectionTime = Date.now()
    }

    public set(key: K, value: T, lifetime = this.lifetime): T {
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
            if (now >= container.expire) {
                this.map.delete(key)
            }
        })
        this.lastGarbageCollectionTime = now
    }
}
