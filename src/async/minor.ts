/**
 * Asynchronously await for desired ms time
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
