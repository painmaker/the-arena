import { DependencyList, useEffect } from 'react';

const useRegisterForUnhandledEvent = (event: string, callback: (...args: any[]) => void, dependencies?: DependencyList) => {

  useEffect(() => {
    const id = $.RegisterForUnhandledEvent(event, callback);
    return () => {
      $.UnregisterForUnhandledEvent(event, id);
    }
  }, dependencies);

}

export default useRegisterForUnhandledEvent;
