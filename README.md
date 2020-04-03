# Reykjavík Design System CSS Server

This package contains all you need to run the CSS server for Reykjavík's
Design System.

---

**Chapters:**

<!-- prettier-ignore-start -->
- [Run the server](#run-the-server)
- [Development](#development)
- [The public/ folder](#the-public-folder)
	- [public/assets/](#publicassets)
	- [public/css/](#publiccss)

<!-- prettier-ignore-end -->

---

## Run the server

```sh
yarn install --production
yarn run start
```

The `start` script runs a `cssserve` which can be configured in a variety of
ways, including a `--config file` argument, CLI `--args`, via `.cssservec`
file in the project root or parent folder, as well as some environment
variables. (See
[`cssserve`'s documentation](https://github.com/hugsmidjan/cssserve#configuration)
for details.)

## Development

Start the SCSS build and image compression task:

```sh
yarn install
yarn run dev
```

In a second terminal start the dev server

```sh
yarn run dev:server
```

## The public/ folder

The public folder is literally the static webroot of
`https://styles.reykjavik.is/`

In addition to `favicon.ico` and maybe `robots.txt` it mainly contains two
folders:

### public/assets/

This folder is built (copied, compressed, etc.) from `src/assets`

Placing files into this folder allows stable (`<img src="..." />`) links to
https://styles.reykjavik.is/assets/reykjavik-logo.svg, etc. – links that don't
involve the path token "CSS" or a css-version number.

If certain perennial assets need versioning, then embed their version number
in their filename.

### public/css/

This is where all the CSS version folders live - each containing their own
images, font-files, etc.

Those folders contain the output of a SASS build task - and should generally
never change. Only new (semantically-versioned) folders should be added.

The only exception to this immutability rule are any obviously named
testing/demo folders, like `public/css/dev-v1/` or such.

**NOTE:** The development CSS build task builds into a folder called
`public/css/dev/`. This folder is **not** pushed to the live server.
