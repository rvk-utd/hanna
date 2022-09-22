#! /bin/sh

### Make sure all local submodule changes are also pushed
if [ -e "style-server/package.json" ]; then
  cd style-server
  git stash
  git checkout feature/style-server
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
