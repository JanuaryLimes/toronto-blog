import { useState, useRef, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useMeasure<T extends Element>(): [
  { ref: React.RefObject<T> },
  {
    left: number;
    top: number;
    width: number;
    height: number;
  }
] {
  const ref = useRef<T | null>(null);
  const [bounds, set] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, bounds];
}
