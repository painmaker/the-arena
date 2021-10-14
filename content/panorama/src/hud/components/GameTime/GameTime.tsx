import React, { useState } from "react";
import { formatTime } from "../../../utils";
import { Styles } from "./Styles";
import { HUD_THINK_SLOW } from "../../App";
import { useInterval } from "../../hooks/useInterval";

const formatGameTime = (dotaTime: number) => {
  const hours = formatTime(Math.floor(dotaTime / 3600));
  const minutes = formatTime(Math.floor((dotaTime % 3600) / 60));
  const seconds = formatTime(Math.floor((dotaTime % 3600) % 60));
  if (hours === '00') {
    return minutes + ":" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

type Props = {
  // ownProps
}

const GameTime = (props: Props) => {

  const [gameTime, setGameTime] = useState(Game.GetDOTATime(false, false));

  useInterval(() => {
    setGameTime(Game.GetDOTATime(false, false));
  }, HUD_THINK_SLOW);

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
