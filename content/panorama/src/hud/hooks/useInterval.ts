import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number = 0) => {

  const savedCallback = useRef<Function>(() => { });

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    function update() {
      savedCallback.current();
    }

    let id = setInterval(update, delay);
    return () => clearInterval(id);

  }, [delay]);

}