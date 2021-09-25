import React, { useEffect, useState } from "react";
import { formatTime } from "../../../utils";
import { HUD_THINK_SLOW } from "../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {}

const formatGameTime = (dotaTime: number) => {
  const hours = formatTime(Math.floor(dotaTime / 3600));
  const minutes = formatTime(Math.floor((dotaTime % 3600) / 60));
  const seconds = formatTime(Math.floor((dotaTime % 3600) % 60));
  if (hours === '00') {
    return minutes + ":" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

const GameTime = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const [gameTime, setGameTime] = useState(Game.GetDOTATime(false, false));

  useEffect(() => {

    const update = () => {
      setGameTime(Game.GetDOTATime(false, false));
    };

    update();
    const id = setInterval(update, HUD_THINK_SLOW);

    return () => clearInterval(id);

  }, [setInterval, clearInterval]);

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.Label()}
        text={formatGameTime(gameTime)}
      />
    </Panel>
  );

};

export default withReactTimeout(GameTime);
