import { useEffect, useRef } from 'react';

export const useTimeout = (callback: Function, delay: number = 0) => {

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    const update = () => {
      savedCallback.current();
    }

    const scheduleId = $.Schedule(delay, update);

    return () => {
      try {
        $.Msg(`Canceling schedule with id ${scheduleId}`)
        $.CancelScheduled(scheduleId)
      } catch (exception) {
        $.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
      }
    }

  }, [delay]);

}
