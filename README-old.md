**NOTE:** This README is outdated and has boken links.  
It describes an older Hanna code repository, but the contents may get
harvested into other READMEs.

# Reykjavík Design System Storybook

This project contains the reference HTML patterns for Hanna - Reykjavík City's
Design System, and several other supporting sub-projects.

Included is:

1. **The HTML patterns** are encoded as React components and rendered using
   Storybook.

   - The React components and story files are located under
     [`src/components`](src/components)
   - The Storybook server is
     [storybook.reykjavik.is](https://storybook.reykjavik.is)
   - The Official pattern documentation is at
     [design.reykjavik.is](https://design.reykjavik.is) -
     [Change log](CHANGELOG.md)

2. **Twig templates** used by the Drupal CMS driving
   [www.reykjavik.is](https://www.reykjavik.is).

   - The Twig files sit alongside their React counterparts inside
     [`src/components`](src/components)
   - (No change log)

3. **React component library** that implements the HTML patterns.

   - Package folder is [`hanna-react/`](hanna-react) – building from
     [`src/components`](src/components)
   - Published as `@hugsmidjan_is/hanna-react` until 1.0 release
   - Eventually available via npm/yarn install as `@reykjavik/hanna-react`
   - See also the
     [React conventions README](hanna-react/README-conventions.md)
   - [Change log](hanna-react/CHANGELOG.md)

4. **Vanilla JavaScript "sprinkles"** that progressively enhance
   server-rendered HTML components.
   - Package folder is [`hanna-sprinkles/`](hanna-sprinkles) – building from
     [`src/components`](src/sprinkles)
   - Published as `@hugsmidjan_is/hanna-sprinkles` until 1.0 release
   - Eventually available via npm/yarn install as
     `@reykjavik/hanna-sprinkles` - [Change log](hanna-sprinkles/CHANGELOG.md)

...

Finally, the reference CSS code is maintained in a separate repo – called
[`hanna-styles`](https://github.com/rvk-utd/hanna-styles) and served from
[styles.reykjavik.is](https://styles.reykjavik.is). (See also:
[CSS change log](https://styles.reykjavik.is/changelog.txt))
