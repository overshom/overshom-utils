import { spawn, SpawnOptionsWithoutStdio } from 'child_process'

export interface IShellRawResult {
    stderr: string
    stdout: string
    code: number
}

export class ErrorShell extends Error {
    public stderr: string
    public stdout: string
    public code: number

    constructor({ stderr, stdout, code }: IShellRawResult) {
        super(stderr)
        this.stderr = stderr
        this.stdout = stdout
        this.code = code
    }
}

export const shellRaw = async (cmd: string, options: SpawnOptionsWithoutStdio = {}): Promise<IShellRawResult> => {
    const proc = spawn(cmd, {
        shell: true,
        detached: true,
        ...options,
    })

    return new Promise((res) => {
        const stdout: string[] = []
        const stderr: string[] = []

        proc.stdout.on('data', data => {
            stdout.push(String(data))
        })

        proc.stderr.on('data', data => {
            stderr.push(String(data))
        })

        proc.on('close', code => {
            res({
                stdout: stdout.join(''),
                stderr: stderr.join(''),
                code,
            })
        })
    })
}

export const shell = async (cmd: string, options: SpawnOptionsWithoutStdio = {}) => {
    const { code, stdout, stderr } = await shellRaw(cmd, options)
    if (code !== 0) {
        throw new ErrorShell({ stderr, stdout, code })
    }
    return stdout
}

export const shellWithOptions = (options: SpawnOptionsWithoutStdio = {}) => (cmd: string, override: SpawnOptionsWithoutStdio = {}) => shell(cmd, {
    ...options,
    ...override,
})
