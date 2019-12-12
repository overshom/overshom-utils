const ASC = 'ASC'
const DESC = 'DESC'
type SORT_ORDER = typeof ASC | typeof DESC

const compareNum = (a: number, b: number, order: SORT_ORDER) => {
    if (order === ASC) {
        return a - b
    }
    return b - a
}

const compareStr = (a: string, b: string, order: SORT_ORDER) => {
    if (a < b) {
        return order === ASC ? -1 : 1
    }
    if (a > b) {
        return order === ASC ? 1 : -1
    }
    return 0
}

const compareMapping = <T, R extends string | number>(transform: (v: T) => R, order: SORT_ORDER) => (a: T, b: T) => {
    const ta = transform(a)
    const tb = transform(b)
    if (typeof ta === 'string' && typeof tb === 'string') {
        return compareStr(ta, tb, order)
    }
    if (typeof ta === 'number' && typeof tb === 'number') {
        return compareNum(ta, tb, order)
    }
    throw new Error('Compare mapping error: transformed values should be both strings or both numbers')
}

export const ascendingNum = (a: number, b: number) => compareNum(a, b, ASC)
export const descendingNum = (a: number, b: number) => compareNum(a, b, DESC)

export const ascendingStr = (a: string, b: string) => compareStr(a, b, ASC)
export const descendingStr = (a: string, b: string) => compareStr(a, b, DESC)

export const ascendingMapping = <T, R extends string | number>(transform: (v: T) => R) => compareMapping(transform, ASC)
export const descendingMapping = <T, R extends string | number>(transform: (v: T) => R) => compareMapping(transform, DESC)
