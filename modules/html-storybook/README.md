# Hanna HTML Pattern Storybook

This server renders examples of Hanna components and illustrating the basic
(framework/tech agnostic) HTML patterns.

## Dev server

```sh
cd modules/html-storybook
yarn run dev
```

Starts hot-reloading development server on port `6006`.

**NOTE:** This requires you to also run the hanna-css style server.

```sh
cd modules/hanna-css
## Serves up the latest local CSS build results:
yarn run dev:server
## … or if you are actively editing the CSS:
# yarn run dev
```

## Publish to hanna-docs.reykjavik.is

This builds a static copy of the documenation and adds new commits to the
[hanna-server-docs](https://github.com/rvk-utd/hanna-server-docs) repo (a
submodule of this monorepo)

1. `cd modules/html-storybook`
2. `yarn run publish`

(NOTE: The "hanna-docs" server is automatically redeployed whenever new
commits are pushed to the
[`main` branch](https://github.com/rvk-utd/hanna-server-docs/tree/main) of
`hanna-server-docs`.)
