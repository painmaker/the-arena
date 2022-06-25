import React, { useState } from "react";
import { formatTime } from "../../../../utils";
import Styles from "./styles.module.css";
import { HUD_THINK_SLOW } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

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

  useInterval(() => {
    setGameTime(Game.GetDOTATime(false, false));
  }, HUD_THINK_SLOW);

  $.Msg(`gameTime:${gameTime}`)

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={formatGameTime(gameTime)}
      />
    </Panel>
  );

};

export default React.memo(GameTime);
