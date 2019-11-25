# overshom-utils

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