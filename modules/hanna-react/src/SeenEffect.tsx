import React from 'react';

import {
  EffectProp,
  getEffectAttr,
  SeenProp,
  useSeenEffect,
} from './utils/seenEffect.js';

type TagProps<Tag extends keyof JSX.IntrinsicElements = 'div'> = Omit<
  JSX.IntrinsicElements[Tag],
  'ref'
>;

type SeenEffectPropsBase<Tag extends keyof JSX.IntrinsicElements = 'div'> = {
  Tag?: Tag;
} & EffectProp;

// ---------------------------------------------------------------------------

type _SeenEffectProps = SeenEffectPropsBase & { tagProps: TagProps };

const _SeenEffect = (props: _SeenEffectProps) => {
  const { Tag = 'div', effectType, tagProps } = props;
  const [ref] = useSeenEffect();

  return <Tag {...tagProps} ref={ref} {...getEffectAttr(effectType)} />;
};

// ---------------------------------------------------------------------------

export type SeenEffectProps<Tag extends keyof JSX.IntrinsicElements = 'div'> =
  SeenEffectPropsBase<Tag> & SeenProp & TagProps<Tag>;

export const SeenEffect = <Tag extends keyof JSX.IntrinsicElements>(
  props: SeenEffectProps<Tag>
) => {
  const { Tag = 'div', effectType, startSeen, ...tagProps } = props as SeenEffectProps;
  const addEffects = (effectType || '') !== 'none' || startSeen !== true;

  return addEffects ? (
    <_SeenEffect Tag={Tag} effectType={effectType} tagProps={tagProps} />
  ) : (
    <Tag {...tagProps} />
  );
};

export default SeenEffect;
