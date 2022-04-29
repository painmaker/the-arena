import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number = 0.0) => {

  const savedCallback = useRef<Function>(() => { });

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    let scheduleID: ScheduleID = -1 as ScheduleID;

    const update = () => {
      scheduleID = $.Schedule(delay, update);
      savedCallback.current();
    }

    update();

    return () => {
      try {
        $.CancelScheduled(scheduleID);
      } catch (exception) {
        $.Msg("Exception: " + exception)
      }
    }

  }, [delay]);

}