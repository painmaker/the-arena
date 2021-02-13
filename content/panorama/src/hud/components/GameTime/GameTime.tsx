import React, { useEffect, useState } from "react";
import { formatTime } from "../../../utils";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";

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

  const [gameTime, setGameTime] = useState(Game.GetDOTATime(false, false));

  useEffect(() => {
    const id = props.setInterval(() => {
      setGameTime(Game.GetDOTATime(false, false));
    }, 1000);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={'gameTimeContainer'}>
      <Label
        className={'gameTimeLabel'}
        text={formatGameTime(gameTime)}
      />
    </Panel>
  );

};

export default withReactTimeout(GameTime);
