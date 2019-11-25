set -e

yarn test

yarn build

# make sure index.js inside dist folder
node dist

npm publish