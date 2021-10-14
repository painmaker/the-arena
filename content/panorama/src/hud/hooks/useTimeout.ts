import { useEffect, useRef } from 'react';

export const useTimeout = (callback: Function, delay: number = 0) => {

  const savedCallback = useRef<Function>(() => { });

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    function update() {
      savedCallback.current();
    }

    let id = setTimeout(update, delay);
    return () => clearTimeout(id);

  }, [delay]);

}