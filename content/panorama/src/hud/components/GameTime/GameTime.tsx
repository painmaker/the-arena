import React, { useEffect, useState } from "react";
import { formatTime } from "../../../utils";
import { SCHEDULE_THINK_SLOW } from "../../App";
import { cancelSchedule } from "../../utils/Schedule";
import { Styles } from "./Styles";

const formatGameTime = (dotaTime: number) => {
  const hours = formatTime(Math.floor(dotaTime / 3600));
  const minutes = formatTime(Math.floor((dotaTime % 3600) / 60));
  const seconds = formatTime(Math.floor((dotaTime % 3600) % 60));
  if (hours === '00') {
    return minutes + ":" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

const GameTime = () => {

  const [gameTime, setGameTime] = useState(Game.GetDOTATime(false, false));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setGameTime(Game.GetDOTATime(false, false));
      schedule = $.Schedule(SCHEDULE_THINK_SLOW, update);
    };
    update();
    return () => cancelSchedule(schedule, GameTime.name);
  }, []);

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.Label()}
        text={formatGameTime(gameTime)}
      />
    </Panel>
  );

};

export default React.memo(GameTime);
