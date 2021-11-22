import React, { useState } from 'react'
import { useGameEvent } from 'react-panorama';
import Styles from "./timer.module.css";

function formatTime(time: number) {
  let minutes = Math.floor(time % 3600 / 60);
  let seconds = Math.floor(time % 60);
  let mDisplay = minutes > 0 ? minutes < 10 ? "0" + minutes : minutes : "00";
  let sDisplay = seconds > 0 ? seconds < 10 ? "0" + seconds : seconds : "00";
  return mDisplay + ":" + sDisplay;
}

const RemainingPlayers = () => {

  const [time, setTime] = useState(180);

  useGameEvent("hero_selection_timer_update", (event) => {
    if (event.time <= 10) {
      Game.EmitSound("ui.click_forward")
    }
    setTime(event.time);
  }, []);

  return (
    <Panel className={Styles.container}>
      <Label className={Styles.title} text={'Time Remaining'} />
      <Panel className={Styles.timeContainer}>
        <Label
          className={Styles.timeLabel}
          style={{ color: time <= 30 ? time <= 10 ? 'red' : 'orange' : 'white' }}
          text={formatTime(time)}
        />
      </Panel>
    </Panel>
  );

}

export default RemainingPlayers;