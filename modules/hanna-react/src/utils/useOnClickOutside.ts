import { MutableRefObject, RefObject, useEffect, useMemo } from 'react';

type Ref<E extends HTMLElement> = MutableRefObject<E> | RefObject<E>;

/**
 *
 * @param ref single or array of refs to check for click outside
 * @param handler callback to run when clicked outside of the ref
 */
const useOnClickOutside = <E extends HTMLElement>(
	ref: Ref<E> | Array<Ref<E>>,
	handler: (event: globalThis.MouseEvent | globalThis.TouchEvent) => void
) => {
	const refs = Array.isArray(ref) ? ref : [ref];
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const stableRefs = useMemo(() => refs, refs);

	useEffect(() => {
		const listener = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
			const shouldTrigger = !stableRefs.some((r) => {
				const node = r.current;

				if (!node) {
					return false;
				}

				return node.contains(event.target as Node);
			});

			if (shouldTrigger) {
				handler(event);
			}
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [handler, stableRefs]);
};

export { useOnClickOutside };
