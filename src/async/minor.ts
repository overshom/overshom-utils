/**
 * Asynchronously await for desired ms time
 */
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
