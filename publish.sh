set -e

yarn build

# make sure index.js inside dist folder
node dist

yarn test

npm publish