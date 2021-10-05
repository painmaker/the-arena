export const cancelSchedule = (schedule: ScheduleID) => {
  try {
    $.Msg("Canceling schedule " + schedule);
    $.CancelScheduled(schedule);
  } catch {
    $.Msg("Schedule not found: " + schedule);
  };
};

