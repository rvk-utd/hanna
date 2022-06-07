# Conventions / Design patterns

## Initial props for stateful components

If a component maintains a `foo` state, but accepts an initial value _that
does not change_, then name that prop `defaultFoo`.

Then force updates to `defaultFoo` by bumping the component's `key` prop.

If the component should also be able to accept live (controlled) `foo` values,
then pass those via a plain `foo` prop, and in those cases make sure to
completely ignore the local state values and not update them.

A bit like what React recommends with native `<input/>` and `<select/>`
elements.

## Class-name prop patterns

Generally first-class Design System components should not accept too many
className or modifier classes.

Abstract (private) components should use this pattern, however:

```ts
type Falsy = undefined | null | false | 0;
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

## Abstract components and private modules.

If you create "abstract" components that are only to be consumed by other
components (like, for example [\_abstract/Button](src/_abstract/Button.tsx))
you should locate them inside the folder [src/\_abstract](src/_abstract).

If the components are "private", single-purpose sub-components, either place
them inline with their parent component, or extract them to a sibling module
file with the ending `.privates.{ts,tsx}`.

## Prefer props over nested components

As a rule of thumb, when an exported component renders a list of sub-items of
a fixed/predictable type, use an array-prop pattern over JSX children.

**DO: ✅**

```js
<MyMenu title="Menu label" items={menuItemPropArray} />
```

**DON'T: ❌**

```js
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

```js
<MyMenu
  title="Menu label"
  items={menuItemPropArray}
  ItemComponent={CustomMyMenuItem}
/>
```

Of course there are sensible exceptions to this rule, especially when the
sub-items are somewhat unpredictable. (Example: `<ButtonBar />`.)

## Private sub-compoenent names

If you refactor a component into "private" sub-components, then those
components should also follow the general rule of Component Names reflecting
their (default) BEM class-name.

Contrived example:

```ts
const MyList = (props: { items: Array<string> }) => (
  <ul className="MyList">
    {props.items.map((item, i) => (
      <MyList__item key="i" item={item} />
      // ^^^^^^^^^ <-- Like this!
    ))}
  </ul>
);
export default MyList;
```
