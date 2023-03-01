## Multi-Select glósur

### Mögulegar Visual Permutations:

1. Inlined selected values, fixed-height

   - **Kostir:**
     - tekur **mjög** lítið pláss
   - **Gallar:**
     - Overflow, cut-off. Þarf user-interaction til að sjá current values.

2. Inlined selected values, flex-height/line-wrapping

   - **Kostir:**
     - Öll valin gildi sjást
     - Tekur tiltölulega lítið pláss
   - **Gallar:**
     - Riðlar layouti og "FormField" útlínan fær breytilega hæð.
     - Þarf að passa halda surrounding layout stable milli closed og open
       state
   - **NOTES:**
     - Hægt að velja milli flex og fixed height með React boolean propsa

3. Selected values below the field
   - **Kostir:**
   - Öll valin gildi sjást
   - FormField ramminn er í fastri hæð
   - **Gallar:**
     - Tekur alltaf meira pláss
   - **NOTES:**
     - Trivially composable úr `<Selectbox/>` + `<TagPill/>`s

Niðurstaða:

- Úfærum 1 og 2 (með `overflow?: boolean` propsa)
- Bíðum með 3 og útfærum það (ef til þess kemur) annað hvort með öðrum
  component eða með propsa sem branchar rendering strategíunni yfir í það
  mode.

### List Interaction Variations

1. Searchable
   - Bara þegar items eru færri en N (kringum 15-20 items)
   - Ekki configurable
   - ~~Configurable fyrir items á bilinu 20-50~~ Meh.
2. Summary of selected values at the top
   - Bara þegar items eru færri en M (kringum 5-8 item)
   - Ekki configurable

### Accessibility Features

- UP og DOWN array navigation of checkbox items færir `.focus()`
- Mouseover færir `.focus()`
- ESCAPE lokar dropdown og færir fókus á input reitinn
- Í closed state þá virkar `<input/>` reiturinn eins og button og opnar
  dropdown með space
- TODO:
  - hvar á að setja aria-labels og svoleiðis?...

### HTML Patterns:

#### Searchable - empty state:

```jsx
<div class="MultiSelect FormField FormField--empty">
  <h4 class="FormField__label" id="my-heading-id">This is my label</h4>
  <div class="FormField__input">
    <input
      type="text"
      aria-label="Leita í valkostum (space til a opna)"
      aria-controls="my-group-id"
      aria-expanded="false" // ???
      id="my-heading-id"
      value=""
    />{/* Scripted: position absolute; inset: 0; opacity: 0.00001 */}
    <div class="MultiSelect__container">
      <ul class="MultiSelect__options" role="group">
        <li class="MultiSelect__option MultiSelect__option--focused Checkbox">
          <input type="checkbox" ... />
          <label ... />
        </li>
        <li class="MultiSelect__option Checkbox">
          <input type="checkbox" ... />
          <label ... />
        </li>
        {/* ...*/}
      </ul>
    </div>
  </div>
</div>
```

#### Searchable - filled state:

```jsx
<div class="MultiSelect FormField FormField--filled">
  <h4 class="FormField__label" id="my-heading-id">
    This is my label
  </h4>
  <div class="FormField__input">
    <input
      type="text"
      aria-label="Leita í valkostum (space til a opna)"
      aria-controls="my-group-id"
      aria-expanded="false" // ???
      id="my-heading-id"
      value=""
    />
    {/* position absolute; opacity: 0.00001 */}
    <div class="MultiSelect__container">
      <div class="MultiSelect__currentvalues" aria-label="Valin gildi:">
        <TagPill /> <TagPill /> <TagPill />
      </div>
      <ul
        class="MultiSelect__options"
        aria-labelledby="my-heading-id"
        role="group"
        aria-expanded="false"
      />
    </div>
  </div>
</div>
```

#### Searchable - focused state:

```jsx
<div class="MultiSelect FormField FormField--filled FormField--focused">
  <h4 class="FormField__label" for="my-heading-id">This is my label</h4>
  <div class="FormField__input">
    <input
      type="text"
      aria-label="Leita í valkostum (space til a opna)"
      aria-controls="my-group-id"
      aria-expanded="false" // ???
      id="my-heading-id"
      value=""
    />{/* position absolute; opacity: 1 */}
    <div class="MultiSelect__container" ... />
  </div>
</div>
```

#### Not searchable - filled state:

Nota `<button/>` í stað input

```jsx
<div class="MultiSelect FormField FormField--empty">
  <h4 class="FormField__label" for="my-heading-id">
    This is my label
  </h4>
  <div class="FormField__input">
    <button
      type="button"
      aria-label="Birta valkosti"
      aria-controls="my-group-id"
      aria-expanded="false"
    />
    {/* position absolute; inset: 0; opacity: 0.00001 */}
    <div class="MultiSelect__container">
      <div class="MultiSelect__currentvalues">
        <TagPill /> <TagPill /> <TagPill />
      </div>
      <ul
        class="MultiSelect__options"
        id="my-group-id"
        aria-labelledby="my-heading-id"
        role="group"
        hidden
      />
    </div>
  </div>
</div>
```

#### Searchable - opened state:

```jsx
<div class="MultiSelect FormField FormField--empty">
  <h4 class="FormField__label" for="my-heading-id">
    This is my label
  </h4>
  <div class="FormField__input">
    {isBrowser && (
      <input
        type="text"
        value=""
        aria-controls="my-group-id"
        aria-expanded="true"
      />
    )}
    {/* position absolute; inset: 0; opacity: 0.00001 */}
    <div class="MultiSelect__container MultiSelect__container--open">
      {isBrowser && (
        <div class="MultiSelect__currentvalues">
          <TagPill removable /> <TagPill removable /> <TagPill removable />
        </div>
      )}
      <ul
        class="MultiSelect__options"
        id="my-group-id"
        aria-labelledby="my-heading-id"
        role="group"
        hidden={false} // visible
      >
        <Checkbox
          Wrapper="li"
          className="MultiSelect__option MultiSelect__option--focused"
        />
        <Checkbox Wrapper="li" className="MultiSelect__option" />
        {/* ...*/}
      </ul>
    </div>
  </div>
</div>
```
