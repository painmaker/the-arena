import { HUD_THINK_FAST } from './../App';
import { useEffect, useLayoutEffect, useRef } from 'react';

const cancel = (scheduleId: ScheduleID) => {
  try {
    // $.Msg(`Canceling schedule with id ${scheduleId}`)
    $.CancelScheduled(scheduleId);
  } catch (exception) {
    // $.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
  }
}

export const useInterval = (callback: () => void, delay: number = HUD_THINK_FAST) => {

  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {

    let scheduleId = -1 as ScheduleID;

    const update = () => {
      // $.Msg(`Update called with scheduleId ${scheduleId}`)
      cancel(scheduleId);
      savedCallback.current();
      scheduleId = $.Schedule(delay, update);
      // $.Msg(`Set scheduleId to ${scheduleId}`)
    }

    scheduleId = $.Schedule(0, update);

    return () => cancel(scheduleId);

  }, [delay]);

}
