import React, { useEffect, useRef, useState } from 'react';
import { LinksFunction } from '@remix-run/node';
import { Form, Link, useTransition } from '@remix-run/react';
import TagPill, { TagPillProps } from '@reykjavik/hanna-react/TagPill';

import { Changeset } from '../utils/tests.server';

import styles from './ReviewShot.css';

const capitalize = (str: string) => str[0]?.toUpperCase() + str.slice(1);

export type Mode = 'difference' | 'actual' | 'expected';

const modeColor: Record<Mode, TagPillProps['color']> = {
  difference: 'yellow',
  actual: 'orange',
  expected: 'green',
};

const getImgShowFlags = (change: Changeset, mode: Mode) => {
  const { diffUrl, actualUrl, expectedUrl } = change;
  const diffMissing = !diffUrl && mode === 'difference';
  return {
    diff: diffUrl && mode === 'difference',
    actual: actualUrl && (mode === 'actual' || diffMissing),
    expected: expectedUrl && (mode === 'expected' || diffMissing),
  };
};

// ---------------------------------------------------------------------------

type SkipLinkProps = {
  id: string | undefined;
  type: 'next' | 'prev';
  label: string;
};

const SkipLink = (props: SkipLinkProps) => {
  const { id, type, label } = props;
  const className = `ReviewShot__actionbutton ReviewShot__actionbutton--goto--${type}`;
  const visibleText = type === 'prev' ? '⇦' : '⇨';

  return id ? (
    <Link to={`/review/${id}`} className={className} aria-label={label} title={label}>
      {visibleText}
    </Link>
  ) : (
    <span className={className}>{visibleText}</span>
  );
};

// ---------------------------------------------------------------------------

const useReviewState = (change: Changeset) => {
  const isNew = !change.expectedUrl;
  const wrappeRref = useRef<HTMLDivElement>(null);
  const isLoading = useTransition().state !== 'idle';
  const [mode, setMode] = useState<Mode>(isNew ? 'actual' : 'difference');
  const [zoomed, setZoom] = useState<true | undefined>();
  const [primed, setPrimed] = useState({ on: false, letter: '' });
  const resetPrimed = () =>
    setPrimed((state) => (state.on ? { ...state, on: false } : state));
  const toggleZoom = () => setZoom((zoomed) => !zoomed || undefined);
  const toDiffMode = () => setMode('difference');
  const toggleMode = () =>
    setMode((prevMode) => (prevMode === 'actual' ? 'expected' : 'actual'));

  useEffect(() => {
    if (isLoading) {
      setPrimed({ on: false, letter: '' });
      return;
    }
    let lastKey = '';
    let primeout: ReturnType<typeof setTimeout>;
    const shortcuts = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const doublePress = key === lastKey;
      lastKey = key;
      clearTimeout(primeout);
      resetPrimed();

      if (!isNew) {
        if (key === 'D') {
          toDiffMode();
          return;
        }
        if (key === 'F') {
          toggleMode();
          return;
        }
      }
      if (key === 'A' || key === 'R') {
        const action = key === 'A' ? 'accept' : 'reject';
        const submitButton = wrappeRref.current?.querySelector<HTMLButtonElement>(
          `.ReviewShot__actionbutton--${action}:not(:disabled)`
        );
        if (!submitButton) {
          return;
        }
        if (doublePress) {
          submitButton.click();
        } else {
          setPrimed({ on: true, letter: key });
          primeout = setTimeout(() => {
            resetPrimed();
            lastKey = '';
          }, 1250);
        }
        return;
      }
      if (key === 'N' || key === 'P' || key === 'J' || key === 'K') {
        const dir = key === 'N' || key === 'J' ? 'next' : 'prev';
        wrappeRref.current
          ?.querySelector<HTMLAnchorElement>('.ReviewShot__actionbutton--goto--' + dir)
          ?.click();
        return;
      }
    };
    document.addEventListener('keyup', shortcuts);
    return () => {
      document.removeEventListener('keyup', shortcuts);
    };
  }, [isLoading, isNew]);

  return {
    isNew,
    mode,
    toDiffMode,
    toggleMode,
    wrappeRref,
    primed,
    zoomed,
    toggleZoom,
  };
};

// ---------------------------------------------------------------------------

export type ReviewShotProps = {
  change: Changeset;
};

export const ReviewShot = (props: ReviewShotProps) => {
  const { actualUrl, expectedUrl, diffUrl, nextId, prevId, confirmedBug, confirmedOk } =
    props.change;
  const { isNew, mode, toDiffMode, toggleMode, wrappeRref, primed, zoomed, toggleZoom } =
    useReviewState(props.change);

  const showImg = getImgShowFlags(props.change, mode);
  const primedAction = ({ A: 'accept', R: 'reject' } as const)[primed.letter];

  return (
    <div className="ReviewShot" ref={wrappeRref}>
      <div className="ReviewShot__meta">
        <div className="ReivewShot__modes">
          {isNew ? (
            <TagPill color="green" large>
              New Screenshot
            </TagPill>
          ) : (
            <TagPill color={modeColor[mode]} large>
              {capitalize(mode)}
            </TagPill>
          )}{' '}
          {confirmedBug && (
            <TagPill color="red" large>
              ❌ Bug!
            </TagPill>
          )}
          {confirmedOk && (
            <TagPill color="green" large>
              ✅ OK!
            </TagPill>
          )}
          {!isNew && (
            <button
              className="ReviewShot__modebutton ReviewShot__modebutton--diff"
              onClick={toDiffMode}
            >
              <strong>D</strong>iff view
            </button>
          )}{' '}
          {!isNew && (
            <button
              className="ReviewShot__modebutton ReviewShot__modebutton--flip"
              onClick={toggleMode}
            >
              <strong>F</strong>lip between
            </button>
          )}{' '}
        </div>

        <Form className="ReviewShot__actions" method="post">
          <button
            type="submit"
            className="ReviewShot__actionbutton ReviewShot__actionbutton--accept"
            name="action"
            value="accept"
            disabled={confirmedOk}
          >
            <strong>A</strong>ccept
          </button>{' '}
          <button
            type="submit"
            className="ReviewShot__actionbutton ReviewShot__actionbutton--reject"
            name="action"
            value="reject"
            disabled={confirmedBug}
          >
            <strong>R</strong>eject
          </button>{' '}
          <SkipLink id={prevId} type="prev" label="Skip to pervious (P)" />{' '}
          <SkipLink id={nextId} type="next" label="Skip to next (N)" />{' '}
        </Form>
      </div>
      <div
        className="ReviewShot__shots"
        data-mode={mode}
        data-zoomed={zoomed}
        onClick={toggleZoom}
      >
        {showImg.diff && (
          <img
            className="ReviewShot__shot ReviewShot__shot--diff"
            src={diffUrl}
            alt="Changed pixels highlighted in red"
          />
        )}
        {showImg.actual && (
          <img
            className="ReviewShot__shot ReviewShot__shot--actual"
            src={actualUrl}
            alt="The new screenshot"
          />
        )}
        {showImg.expected && (
          <img
            className="ReviewShot__shot ReviewShot__shot--expected"
            src={expectedUrl}
            alt="The old screenshot"
          />
        )}
      </div>
      <div
        className={
          'ReviewShot__primed' +
          (primedAction ? ' ReviewShot__primed--' + primedAction : '')
        }
        hidden={!primed.on}
      >
        Press <strong>{primed.letter}</strong> again to {primedAction}.
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------

const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'data:text/css,' + encodeURIComponent(styles),
  },
];

ReviewShot.links = links;
ReviewShot.cssTokens = ['TagPill'];
