import { useEffect, useRef } from 'react';

export const useTimeout = (callback: Function, delay: number = 0, deps?: unknown[]) => {

  const savedCallback = useRef<Function>(() => { });

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    function update() {
      savedCallback.current();
    }

    // @ts-ignore
    const id = setTimeout(update, delay);

    return () => {
      // @ts-ignore
      clearTimeout(id);
    }

  }, [delay, deps]);

}