import { useRef } from 'react';

/**
 * Reports if value changed since last time the hook was called.
 *
 * Returns an `{ lastValue }` shaped object, when change is detected.
 * Returns `undefined` otherwise
 *
 * Common usage is if you want an component which is effectively uncontrolled,
 * but resets/changes its internal state whenever a certain prop value changes.
 *
 * ```tsx
 * import { useDidChange } from './utils';
 * // import { useDidChange } from '@reykjavik/hanna-react/utils';
 *
 * // inside your component/hook
 * const [visible, setVisible] = useState(props.visible);
 * if (useDidChange(props.visible)) {
 *   setVisible(props.visible);
 * }
 * ```
 *
 * Another use case might be to capture not only IF but HOW a prop value changed
 * in a controlled component
 *
 * ```tsx
 * const [trend, setTrend] = useState(null);
 * const countChanged = useDidChange(props.count);
 * if (countChanged) {
 *   setTrend(props.count > countChanged.lastValue ? 'increasing' : 'decreasing');
 * }
 * ```
 *
 * **NOTE:** This hook should be handled with care, as its overuse can easily lead
 * to poorly structured and buggy component behavior.
 */
export const useDidChange = <T>(value: T): { lastValue: T } | undefined => {
  const lastValueRef = useRef(value);
  const lastValue = lastValueRef.current;
  if (value !== lastValue) {
    lastValueRef.current = value;
    return { lastValue };
  }
};
