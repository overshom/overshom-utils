import { sleep } from './minor'

export interface IRetryableConfig {
    attempts: number
    delay?: number
}

/**
 * Creates retryable function which retries specified async lambda for specified attempts.
 * Throws error when final attempt failed.
 */
export const createRetryable = (scopedConfig: IRetryableConfig) => {
    const internalRetryable = async <T>(fn: () => Promise<T>, config?: IRetryableConfig): Promise<T> => {
        const { delay = 0 } = config ?? scopedConfig
        let { attempts } = config ?? scopedConfig

        const run = async () => {
            attempts--
            return fn()
        }

        try {
            return await run()
        } catch (e) {
            if (attempts < 1) {
                throw new Error(`attempts exhausted: ${e}`)
            }
            if (scopedConfig.delay) {
                await sleep(scopedConfig.delay)
            }
            return await internalRetryable(fn, {
                attempts,
                delay,
            })
        }
    }

    return internalRetryable
}