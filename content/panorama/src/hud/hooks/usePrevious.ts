import { useLayoutEffect, useRef } from "react";

const usePrevious = (value: any) => {

  const ref = useRef();

  useLayoutEffect(() => {
    ref.current = value;
    return () => ref.current = undefined;
  }, [value]);

  return ref.current;
  
}

export default usePrevious;
