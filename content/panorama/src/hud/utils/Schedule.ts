const debug = false;
const logMinusOneSchedules = false;

export const cancelSchedule = (schedule: ScheduleID, context?: String, log?: boolean) => {
  try {
    if (log || debug) {
      if (context) {
        $.Msg("Info: Canceling schedule " + schedule + " for " + context);
      } else {
        $.Msg("Info: Canceling schedule " + schedule);
      }
    }
    $.CancelScheduled(schedule);
  } catch {
    if (logMinusOneSchedules || schedule !== -1) {
      $.Msg("Error: Schedule not found: " + schedule);
    }
  };
};

