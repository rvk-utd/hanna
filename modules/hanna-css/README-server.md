# Reykjavík Design System CSS Server

This package contains all you need to run the CSS server for Reykjavík's
Design System.

---

**Chapters:**

<!-- prettier-ignore-start -->
- [Run the server](#run-the-server)
  - [Get CSS bundles](#get-css-bundles)
- [The public/ folder](#the-public-folder)
  - [public/assets/](#publicassets)
  - [public/css/](#publiccss)
- [CSS Versioning](#css-versioning)

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

### Get CSS bundles

The server's "bundle" API works like this:

```
https://[HOSTNAME_AND_PORT]/bundle/[VERSION_FOLDER]?m=[CSS_TOKEN1,CSS_TOKEN2]
```

(**NOTE** The name of any CSS file under `public/css/[VERSION_FOLDER]` is a
valid "cssToken".

**Example:**

```
https://localhost:4000/bundle/v1?m=-basics,Layout-full,HeroBlock
```

This gives you `@import` links pointing to the latest minified
production-ready CSS files for "Version 1.\*".

You can also get a development version of the CSS, with visual "debug"
messages and common markup-mistakes flagged, by changing the `VERSION_FOLDER`
to `dev-v1`. Like so:

```
https://localhost:4000/bundle/dev-v0?m=-basics,Layout-full,HeroBlock
```

## The public/ folder

The public folder is literally the static webroot of
`https://styles.reykjavik.is/`

In addition to `favicon.ico` and maybe `robots.txt` it mainly contains two
folders:

### public/assets/

This folder contains all sorts of static assets, such as images, logos,
app-icons, typefaces, etc.

### public/css/

This is where all the CSS version folders live - each containing their own
images, font-files, etc.

The contents of those folders should generally never change — Only new
(semantically-versioned) folders should be added.

The only exception to this immutability rule are any obviously named
testing/dev folders, like `public/css/dev-v1/` or such.

**NOTE:** The development CSS build task builds into a folder called
`public/css/dev/`. This folder is for local-development only and is **not**
pushed to the live server.

## CSS Versioning

The **major** version number of the stylesheets under `public/css/v*` always
matches the Hanna markup pattern major version that they target.

It's thus generally advisable to broadly link to `/bundle/v1` or `/bundle/v2`
to automatically receive the latest updates and only resort to more
fine-trained versions (i.e. `/bundle/v1.3` or `/bundle/v2.1`) if specific
problems arise that call for pinning a minor version temporarily.

(The only exception is `v0` which should never be used, since
[SemVer](https://semver.org/spec/v2.0.0.html) dictates that all "minor"
versions `< 1.0.0` qualify as major/breaking. Instead always pin to a specific
minor version like so `/bundle/v0.8`)
