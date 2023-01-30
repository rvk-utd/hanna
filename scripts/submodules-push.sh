#! /bin/sh

### Make sure all local submodule changes are also pushed
if [ -e "servers/styles/package.json" ]; then
  cd servers/styles
  git stash
  git checkout main
  git push
  cd -
fi
if [ -e "servers/docs/package.json" ]; then
  cd servers/docs
  git stash
  git checkout main
  git push
  cd -
fi
