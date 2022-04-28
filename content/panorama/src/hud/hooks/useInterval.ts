import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number = 0) => {

  const savedCallback = useRef<Function>(() => { });

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    let scheduleID: ScheduleID = -1 as ScheduleID;

    const update = () => {
      scheduleID = $.Schedule(0.03, update);
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