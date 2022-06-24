import { DependencyList, useEffect } from 'react';

const useRegisterForUnhandledEvent = (event: string, callback: (...args: any[]) => void, dependencies?: DependencyList) => {

  useEffect(() => {
    const id = $.RegisterForUnhandledEvent(event, callback);
    $.Msg(`Registering unhandled event ${event} with ID ${id}`);
    return () => {
      $.UnregisterForUnhandledEvent(event, id);
      $.Msg(`Unregistering unhandled event ${event} with ID ${id}`);
    }
  }, dependencies);

}

export default useRegisterForUnhandledEvent;
