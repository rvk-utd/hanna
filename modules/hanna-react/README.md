# @reykjavik/hanna-react

The official React components for Hanna – Reykjavík's design-system

```
npm install --save @reykjavik/hanna-react
```

## Versioning

This module always targets the most recent version of the Hanna markup
patterns (currently **Hanna 0.8**).

<!--
	NOTE:
	If need arises we may decide to branch the repo and publish separate
	legacy modules (i.e. `@reykjavik/hanna_1-react`) that provide active
	long-term-support for older major-versions of Hanna's markup patterns.
-->

The version number of the `@reykjavik/hanna-react` package reflects changes in
the React Component signatures, dependencies, etc. and may have major releases
at much higher rate than Hanna's markup patterns.

Note, however, that a major version update to the Hanna markup patterns
automatically triggers a major version bump in this package.

If you need a version of this package that "targets" an older Hanna markup
version, you'll find the appropriate package version in the
[change log](CHANGELOG.md).

## CSS

Each component is paired with a CSS file that can be loaded via the Hanna CSS
server – https://styles.reykjavik.is/

If your project uses `<Layout/>`, `<HeroBlock/>`, `<TextInput/>`,
`<Selectbox/>` and `<ButtonPrimary/>` you can load the required CSS by linking
to
<https://styles.reykjavik.is/bundle/v0.8?m=-basics,Layout,HeroBlock,TextInput,Selectbox,ButtonPrimary>

The preferred way to build the CSS URL is to use the helper `getCssBundleUrl`:

```js
import { getCssBundleUrl } from '@reykjavik/hanna-css';

const cssUrl = getCssBundleUrl([
  '-basics',
  'Layout',
  'HeroBlock',
  'TextInput',
  'Selectbox',
  'ButtonPrimary',
]);
```

**NOTE:** The `-basics` URL token adds basic CSS resets, `@font-face`
declarations global color-variables, etc.

For best result, try and make sure each web page has **only one `<link />`**
to the CSS server to avoid unpredictable styling behavior.

<!--
## Older versions

To view the documentation for older versions of Hanna, check out the
corresponding branches in the git repo.

-->
