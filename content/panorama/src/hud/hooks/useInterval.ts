import { useEffect, useLayoutEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number = 0.0) => {

  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    let scheduleId = -1 as ScheduleID;

    const update = () => {
      $.Msg(`Update called with scheduleId ${scheduleId}`)
      savedCallback.current();
      scheduleId = $.Schedule(delay, update);
      $.Msg(`Set scheduleId to ${scheduleId}`)
    }

    scheduleId = $.Schedule(0, update);

    return () => {
      try {
        $.Msg(`Canceling schedule with id ${scheduleId}`)
        $.CancelScheduled(scheduleId);
      } catch (exception) {
        $.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
      }
    }

  }, [delay]);

}
