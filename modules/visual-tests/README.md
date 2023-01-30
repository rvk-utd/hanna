# Hanna Visual Regression Tests

This package contains a small web server that serves up
[test pages](src/routes/test) with examples of Hanna components, and
[PlayWright](https://playwright.dev) tests that load each of those pages,
snaps a screenshot in various browsers/viewport-sizes and flags any noticable
changes.

All test pages MUST export a `testing` token of the type
[`TestingInfo`](src/testingInfo.ts). (The minimal being `{}`.)

By default the test runner just loads the page with, scrolls to the bottom,
snaps a full-page screenshot, and then exists. But the `testing` token allows
individual pages to specify custom testing behavior. (See:
[`testingInfo.ts`](src/testingInfo.ts) for details.)

**NOTE:** The test runner loads the pages with the query-string
`?noAnimation`, which injects `!important` style rules that sets
`scroll-behavior:auto` and disables CSS `transition`s.

**Table of Contents:**

<!-- prettier-ignore-start -->

- [System Requirements](#system-requirements)
- [Running the Tests](#running-the-tests)
- [Reviewing Changed Screenshots](#reviewing-changed-screenshots)
- [Updating or Adding New Tests](#updating-or-adding-new-tests)
<!-- prettier-ignore-end -->

## System Requirements

**MacOS 12 (Monterey)** is the officially supported platform to run the tests
on.

The test-suite runs on pretty much any OS, but due to slight differences in
browser engine builds on different platform versions, you should expect minor
discrepencies in font-rendering and image anti-aliased. This will predictably
result in some visual tests failing.

**Please DO NOT commit screenshots generated on any other platform.**

## Running the Tests

The visuial-tests are automatically run as part of the publishing process for
the `style-server` and the `@reykjavik/hanna-react` library are published.

Running the PlayWright tests standalone is also possible with `yarn run test`.

BTW, the PlayWright test-runner automatically starts up a (Remix run)
webserver in "testing" mode on port `7347` and the CSS style-server on port
`4000`.

## Reviewing Changed Screenshots

The testing webserver has a page at http://localhost:7357/review, which lists
all of the screenshots with detected changes when the test suite was last run.

There you can view diffs, flip between actual and expected, and then "Accept"
or "Reject" individual changes.

If tests fail, the test-runner will automatically open up the review UI in
your default browser.

## Updating or Adding New Tests

Steps to adding a new test page (e.g. when you add a new component to Hanna):

1. Create a new page component under [src/routes/test](src/routes/test)

   - (See [\_Example.tsx\_](src/routes/test/_Example.tsx_) for reference.)
   - Render the component states you wish to test
   - Run `yarn run webserver:dev` and navigate to your new test page and make
     sure everything looks about right

2. Make sure the module exports a `testing` token of type
   [`TestingInfo`](src/testingInfo.ts)

3. Add your new test module to The Big List of `testingInfos`:

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
