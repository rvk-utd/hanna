#!/bin/sh

OUTFILE='WARNING--SUB-MODULES.txt'

if [ ! -e "servers/styles/package.json" ] && [ ! -e "servers/docs/package.json" ]; then
  echo "" > "$OUTFILE"
  echo "NOTE: \nThis repo contains git submodules in the following folders:\n" >> "$OUTFILE"
  echo " - '/servers/docs'\n" >> "$OUTFILE"
  echo " - '/servers/styles'\n" >> "$OUTFILE"
  echo "\n" >> "$OUTFILE"
  echo "… and you have not installed (at least some of) them.\n" >> "$OUTFILE"
  echo "\n" >> "$OUTFILE"
  echo "If you want to fix that, then run the following command:\n" >> "$OUTFILE"
  echo "\n" >> "$OUTFILE"
  echo "  sh scripts/submodule-install.sh\n" >> "$OUTFILE"
fi
