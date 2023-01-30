#! /bin/sh

git submodule update --init

cd servers/styles
git stash
git checkout main
yarn install
cd -

cd server/docs
git stash
git checkout main
yarn install
cd -
