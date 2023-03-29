# Conventions / Design patterns

**Chapters below:**

<!-- prettier-ignore-start -->

- [Always use named exports](#always-use-named-exports)
- [Be presentational and framework-agnostic](#be-presentational-and-framework-agnostic)
  - [Default props for stateful/uncontrolled components](#default-props-for-statefuluncontrolled-components)
  - [But I want a default, yet resettable state](#but-i-want-a-default-yet-resettable-state)
- [Abstract components and private modules.](#abstract-components-and-private-modules)
- [Class-name prop patterns](#class-name-prop-patterns)
- [Prefer props over nested components](#prefer-props-over-nested-components)
- [Exposing/Extending raw HTML (JSX.IntrinsicElements) props](#exposingextending-raw-html-jsxintrinsicelements-props)
- [Public sub-components](#public-sub-components)
- [Private sub-compoenent names](#private-sub-compoenent-names)
- [Play nice with Preact.js](#play-nice-with-preactjs)
<!-- prettier-ignore-end -->

## Always use named exports

For the sake of consistency and ease of use:

- all modules should export named exports. This also includes React component
  files.

- Single-purpose modules (like most React component modules) should be named
  exactly like their main export, like so:

```ts
// ✅ Good
import { MyComponent } from './MyComponent.js';
import { useMyHook } from './utils/useMyHook.js';
// ❌ Bad
import { myMapper } from './utils/mymapper.js'; // case mismatch
import { myHelperFn } from './utils/myHelperFunction.js'; // naming mismatch
import MyOtherComponent from './MyOtherComponent.js'; // no default exports
```

**NOTE:** Earlier versions of the Hanna codebase used default exports for
components. Evidence of this remains in many places, but should be regarded as
outdated/deprecated practice.

## Be presentational and framework-agnostic

Components should strive to be relatively stateless, and completely
framework-agnostic.

Stateless (controlled) components are usually easier to reason about, and
easier to customize. However, they sometimes require a bit more up-front
effort (external `useState()`s, etc.)

If you want to write a component that hooks into not just React a specific
framework or state-management library that you're commonly using (let say
Next.js) then you should publish that compnent as part of a new library (e.g.
`@reykjavik/hanna-nextjs`).

This new library can become a new module in this monorepo and declares
`@reykjavik/hanna-react` as a dependency.

### Default props for stateful/uncontrolled components

**IMPORTANT:** Make sure you understand the concept of
[controlled vs. uncontrolled components in React](https://www.google.com/search?q=react+controlled+vs+uncontrolled+components)

In cases where you decide an internal (uncontrolled) state is required (or
helpful), then try to follow the pattern that React promotes with native
`<input/>` and `<select/>` elements.

If a component maintains an internal `foo` state, but accepts an initial value
_that should not override the internal state on change_, then name that prop
`defaultFoo`.

If you need to force-reset the internal state of the component (for a changed
`defaultFoo` value to take effect), then bump the component's `key` prop.

If the component should **also** be able to accept live (controlled) `foo`
values, then make use of the
[`useMixedControlState` hook](src/utils/useMixedControlState.ts), which is
specifically designed to help "Keep It Simple and Sane" in such cases.

```tsx
import React, { FC, ReactNode } from 'react';
import { useMixedControlState } from './utils.js';
// import { useMixedControlState } from '@reykjavik/hanna-react/utils';

type FooBarProps = {
  visible?: boolean;
  onChange?: (newVisible: boolean) => void;
  defaultVisible?: boolean;
};

export const FooBar: FC<FooBarProps> = (props) => {
  const [visible, setVisible] = useMixedControlState(props, 'visible', true);

  const handleToggle = () => {
    const newVisible = !visible;
    props.onChange && props.onChange(newVisible);
    setVisible(newVisible);
  };
  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      <div hidden={!visible}>{props.children}</div>
    </div>
  );
};
```

### But I want a default, yet resettable state

If you want to make a component which is effectively uncontrolled, but
resets/changes its internal state whenever a certain prop value changes.

In such cases refrain from calling the controlling prop `defaultSomething`.

Instead call it whatever you'd call a normal controlled state prop, then use
an internal useState and the [`useDidChange` hook](src/utils/useDidChange.ts)
to reset it whenever the prop changes.

```tsx
import { useDidChange } from './utils.js';
// import { useDidChange } from '@reykjavik/hanna-react/utils';

// inside your component/hook
const [visible, setVisible] = useState(props.visible);
if (useDidChange(props.visible)) {
  setVisible(props.visible);
}
```

## Abstract components and private modules.

If you create "abstract" components that are only to be consumed by other
components you should locate them inside the folder
[src/abstract](src/abstract). (Example:
[abstract/\_Button](src/abstract/_Button.tsx))

If the components are "private", single-purpose sub-components, either place
them inline with their parent component, or extract them to another module
file with a file-name ending with `.privates.{ts,tsx}`, or starting with a
`_`.

## Class-name prop patterns

**Public facing Design System components should generally not accept direct
className or modifier class values.** Instead use semantic props, which in
turn set the appropriate classNames.

Abstract (private) components should, however, use this pattern:

```ts
type Falsy = undefined | null | false | 0 | '';
type Modifier = string | Falsy;

type BemPropsModifier = {
  /** List of CSS BEM --modifier's to add to the component's main wrapper.
   * All falsy values are neatly skipped. */
  modifier?: Modifier | ReadonlyArray<Modifier>;
};
type BemProps = {
  /** CSS BEM class-name prefix to be used for this component */
  bem?: string;
  /** Extra className to apply **in addition to** the component's BEM name. */
  className?: string;
} & BemPropsModifier;
```

## Prefer props over nested components

As a rule of thumb, when an exported component renders a list of sub-items of
a fixed/predictable type, use an array-prop pattern over JSX children.

**DO: ✅**

```js
<MyMenu title="Menu label" items={menuItemPropArray} />
```

**AVOID: 🕳**

```tsx
<MyMenu title="Menu label">
  {menuItemPropsArray.map((menuItemProps, i) => {
    <MyMenuItem key={i} {...menuItemProps} />;
  })}
</MyMenu>
```

Props are generally more ergonomic for the developer, and also prevent
accidental mistakes and invalid component nesting.

If the item-level component needs to be configurable, you can add an optional
`ItemComponent` prop, like so:

```tsx
<MyMenu
  title="Menu label"
  items={menuItemPropArray}
  ItemComponent={CustomMyMenuItem}
/>
```

Of course there are sensible exceptions to this rule, especially when the
sub-items are somewhat unpredictable. (Example: `<ButtonBar />`.)

## Exposing/Extending raw HTML (JSX.IntrinsicElements) props

In some cases you want to allow the developers using your component to pass
miscellanious HTML attributes (e.g. `aria-*`, native `on*` handlers, etc.)
without you having to enumerate every single one.

In such cases add an explicitly named prop for that. (Something along the
lines of `htmlProps`/`inputProps`/`buttonProps`/etc.) Avoid the temptation to

**DO: ✅**

```ts
type KnobProps = {
  shape: 'square' | 'circle' | 'triangle';
  onClick: () => void;
  htmlProps: Omit<JSX.IntrinsicElements['button'], 'type' | 'onClick'>;
};
```

This way your users get very clear image of what props your component offers,
and don't get mired in dozens and dozens of alphabetically sorted HTML
attribute names. (As a bonus, you also avoid having to do expensive
destructuring `...rest` properties inside your component source.)

**DON'T: ❌**

```ts
type KnobProps = Omit<JSX.IntrinsicElements['button'], 'type' | 'onClick'> & {
  shape: 'square' | 'circle' | 'triangle';
  onClick: () => void;
};
```

This was an early mistake with many of the form-input and button-related
hanna-react components, and changing it to use a
`inputProps`/`buttonProps`/`htmlProps` prop instead, is one of the planned
breaking changes for a future MAJOR release.

## Public sub-components

If a component has a (tight-)coupled sub-component, and if it doesn't matter
too much if it doesn't get tree-shaken during bundling, then just added as a
property to the parent component.

Example: `<ButtonBar />` exposes [`<ButtonBar.Split/>`](src/ButtonBar.tsx)

Note however, how `ButtonBar` also exports `ButtonBar__split` to aid
IntelliSense discovery, but marks it `@deprecated` and points to
`ButtonBar.Split` instead.

## Private sub-compoenent names

If you refactor a component into "private" sub-components, then those
components should be named to reflect their BEM class-name.

Contrived example:

```tsx
export const MyList = (props: { items: Array<string> }) => (
  <ul className="MyList">
    {props.items.map((item, i) => (
      <MyList__item key="i" item={item} />
      // ^^^^^^^^^ <-- Like this!
    ))}
  </ul>
);
```

## Play nice with Preact.js

Preact is a lovely, lightweight React-compatible (mostly) library, and
Hanna-react should try and support it.

This mostly consists of not relying on `focus` and `blur` events bubbling (a
non-standard behavior "helpfully" patched in by React), without also adding
`onfocusin` and `onfocusout` props for Preact.

BTW, hanna-react has an `isPreact` utility flag that you can use for this
purpose.

```tsx
import { isPreact } from './utils/env.js';
// ...

<div
  className="MyComponent"
  onFocus={focusHandler}
  onBlur={blurHandler}
  // (Sneak this in as Preact does not bubble `FocusEvent`s)
  {...(isPreact && {
    onfocusin: focusHandler,
    onfocusout: blurHandler,
  })}
>
  {/* Children which initiate focus/blur events */}
</div>;
```
