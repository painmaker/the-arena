const debug = true;

export const cancelSchedule = (schedule: ScheduleID, context: String, log?: boolean) => {
  try {
    if (log || debug) {
      $.Msg("Info: Canceling schedule " + schedule + " for " + context);
    }
    $.CancelScheduled(schedule);
  } catch {
    $.Msg("Error: Schedule not found: " + schedule);
  };
};

