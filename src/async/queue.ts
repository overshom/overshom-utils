import { AsyncLambda } from './types'

/**
 * Queue of async lambdas. Each lambda called only after previous lamda promise resolved.
 */
export class AsyncQ {
    jobs: AsyncLambda<any>[] = []
    private busy = false

    async enqueue(job: AsyncLambda<any>) {
        this.jobs.push(job)
        await this.checkJobs()
    }

    private async checkJobs() {
        if (this.busy) {
            return
        }
        const job = this.jobs.shift()
        if (!job) {
            return
        }
        this.busy = true
        try {
            await job()
        } catch { }
        this.busy = false
        await this.checkJobs()
    }
}
