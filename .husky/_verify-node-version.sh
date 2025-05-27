#!/usr/bin/env sh

# If node version is NOT 16 then `yarn install` will fail
# because yarn respects "engines.node" in package.json
if ! [[ "$(node --version)" =~ ^v16\..+$ ]]; then
  # Thus, let's make a blind attempt to see if using nvm to switch works
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  # switch to version specified in client/.nvmrc
  nvm use
  # If this fails (because either nvm is not present or nvm does not
  # have node@20 installed), then we're no worse off than before we
  # entered this `if` block
fi
