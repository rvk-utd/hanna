import React from 'react';
import { TagPill } from '@reykjavik/hanna-react/TagPill';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'TagPill',
};
export default meta;

type Story = StoryObj;

const TagPillStory = () => {
  return (
    <>
      <p>
        <TagPill>Static TagPill</TagPill> <TagPill large>Large TagPill</TagPill>{' '}
      </p>
      <br />
      <p>
        <TagPill type="button">Button TagPill</TagPill>{' '}
        <TagPill href="">Link TagPill</TagPill>{' '}
      </p>
      <br />
      <p>
        <TagPill removable onRemove={() => alert('closing')}>
          Removable
        </TagPill>{' '}
        <TagPill large removable>
          Large removable
        </TagPill>
      </p>
      <br />
      <p>
        <TagPill removable onClick={() => alert('closing')}>
          Button removable
        </TagPill>{' '}
        <TagPill href="" removable>
          Link removable
        </TagPill>{' '}
      </p>
      <br />
      <p>
        <TagPill href="" removable onRemove={() => alert('closing')}>
          Link AND removable
        </TagPill>{' '}
        <TagPill type="button" removable onRemove={() => alert('closing')}>
          Button AND removable
        </TagPill>{' '}
      </p>
      <br />
      <p>
        <TagPill color="green" type="button" removable onRemove={() => undefined}>
          Green TagPill
        </TagPill>{' '}
        <TagPill color="yellow" type="button" removable onRemove={() => undefined}>
          Yellow TagPill
        </TagPill>{' '}
        <TagPill color="orange" type="button" removable onRemove={() => undefined}>
          Orange TagPill
        </TagPill>{' '}
        <TagPill color="red" type="button" removable onRemove={() => undefined}>
          Red TagPill
        </TagPill>{' '}
      </p>
    </>
  );
};

export const _TagPill: Story = {
  render: () => <TagPillStory />,
};
