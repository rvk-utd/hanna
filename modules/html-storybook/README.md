# Hanna HTML Pattern Storybook Server

This server renders examples of Hanna components and illustrating the basic
(framework/tech agnostic) HTML patterns.

## Start the server

This builds the project and starts a static HTTP file-server on port `3000`

1. Clone the project repo
2. Make sure `yarn` (version `>=1.22`) is installed.
3. `cd modules/html-storybook`
4. `yarn workspaces focus --production`
5. `yarn run start`

## Dev server

Starts hot-reloading development server on port `6006`

1. `cd modules/html-storybook`
2. `yarn run dev`
