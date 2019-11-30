# overshom-utils

<a href="https://www.npmjs.com/package/overshom-utils">
    <img src="https://img.shields.io/npm/v/overshom-utils.svg" alt="npm package" />
</a>

Collection of TypeScript utils to solve trivial tasks in browser and NodeJs environments.

# Installation

```sh
yarn add overshom-utils
# or
npm i overshom-utils
```

# Usage

```ts
import { randi, sleep } from 'overshom-utils'

const pulsar = async () => {
    while (true) {
        console.log(randi(0, 9))
        await sleep(500)
    }
}

pulsar()
```

## List of async utils

- sleep

## List of sync utils

- randi

# TODO

Integrate Circle CI + badge