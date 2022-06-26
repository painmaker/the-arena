import { HUD_THINK_FAST } from './../App';
import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number = HUD_THINK_FAST) => {

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    let scheduleId = -1 as ScheduleID;

    const update = () => {
      // $.Msg(`Update called with scheduleId ${scheduleId}`)
      savedCallback.current();
      scheduleId = $.Schedule(delay, update);
      // $.Msg(`Set scheduleId to ${scheduleId}`)
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
