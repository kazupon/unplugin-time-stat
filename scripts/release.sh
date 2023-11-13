#!/bin/bash

set -xe

# Check nightly release
if [[ ! -z ${NIGHTLY_RELEASE} ]] ; then
  npx tsx ./scripts/bump-nightly
fi

# Update token
if [[ ! -z ${NPM_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  npm whoami
fi

# Release packages
echo "Publishing"
npm publish
