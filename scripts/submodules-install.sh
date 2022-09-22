#! /bin/sh

git submodule update --init

cd style-server
git stash
git checkout feature/style-server
yarn install
cd -

cd server/docs
git stash
git checkout master
yarn install
cd -
