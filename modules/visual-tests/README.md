# Hanna Visual Regression Tests

This package contains a small web server that serves up
[test pages](src/routes/test) with examples of Hanna components, and
[PlayWright](https://playwright.dev) tests that load each of those pages,
snaps a screenshot in various browsers/viewport-sizes and flags any noticable
changes.

All test pages MUST export a `testing` token of the type
[`TestingInfo`](src/testingInfo.ts). (The minimal being `{}`.)

By default the test runner just loads the page, scrolls to the bottom, snaps a
full-page screenshot, and then exists. But the `testing` token allows
individual pages to specify custom testing behavior. (See:
[`testingInfo.ts`](src/testingInfo.ts) for details.)

## Running the Tests

The visuial-tests are automatically run as part of the publishing process for
the [`style-server`] and `@reykjavik/hanna-react` library are published.

Running the PlayWright tests standalone is also possible with `yarn run test`.

BTW, the PlayWright test-runner automatically starts up a (Remix run)
webserver in "testing" mode on port `7347` and the CSS style-server on port
`4000`. If either of those servers are already running it re-uses them.

## Updating Screenshots

**NOTE:** A nice reviewing UI is under construction, but until it's ready,
using the commnand line is the way.

<!--
The testing webserver has a page at http://localhost:7357/review, which lists
all of the screenshots with detected changes when the test suite was last run.

This is the easiest way to review and accept changes.
-->

### Updating via the command line

The default/basic way to update the stored screenshots is to run the tests
with a
[`--update-snapshots` flag](https://playwright.dev/docs/test-cli#reference)

**Example 1:** Marking **ALL** changed screenshots as "The New Correct":

```sh
yarn run test --update-snapshots
```

**Example 2:** To mark changed screenshots relating to a single
`routes/test/**` module (in this case `HeroBlock`) as "corret":

```sh
yarn run test --update-snapshots -g HeroBlock
```

## Updating or Adding New Tests

Steps to adding a new test page (e.g. when you add a new component to Hanna):

1. Create a new page component under [src/routes/test](src/routes/test)

   - (See [\_Example.tsx\_](src/routes/test/_Example.tsx_) for reference.)
   - Render the component states you wish to test
   - Run `yarn run webserver:dev` and navigate to your new test page and make
     sure everything looks about right

2. Make sure the module exports a `testing` token of type
   [`TestingInfo`](src/testingInfo.ts)

3. Add your new test module to the master `testingInfos` list:

   1. Open [tests/tests.spec.ts](tests/tests.spec.ts)
   2. Locate the declaration of the `testingInfos` object
   3. Add to it the `testing` info your new test page module exports

4. Run the test-suite with `yarn run test`.  
   _(NOTE: When a new screenshot is generated PlayWright reports that the test
   failed — because the new screenshot was unexpected — but auto-accepts it
   anyway, for next time.)_

5. Review review any newly added/changed screenshots and accept them when
   ready. (See [directions above](#updating-screenshots))

6. Commit everything to git, when happy
