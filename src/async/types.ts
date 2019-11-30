export type AsyncLambda<T> = () => Promise<T>

/**
 * Get type of resolved promise value
 */
export type ThenArg<T> = T extends Promise<infer U> ? U : T
