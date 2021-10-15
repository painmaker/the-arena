import { useEffect, useRef } from 'react';

export const useTimeout = (callback: Function, delay: number = 0, log?: boolean) => {

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
    if (log) $.Msg("Created interval with ID: " + id);

    return () => {
      // @ts-ignore
      clearTimeout(id);
      if (log) $.Msg("Clearing interval with ID: " + id);
    }

  }, [delay]);

}