import React, { useState } from 'react'
import { useGameEvent } from 'react-panorama';

const wrapper: Partial<VCSSStyleDeclaration> = {
  verticalAlign: 'bottom',
  horizontalAlign: 'left',
  flowChildren: 'down',
  marginLeft: '75px',
  marginBottom: '173px',
}

const timeContainer: Partial<VCSSStyleDeclaration> = {
  width: '125px',
  height: '39px',
  padding: '1px',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
}

const timeLabel: Partial<VCSSStyleDeclaration> = {
  fontSize: '17px',
  color: 'white',
  verticalAlign: 'center',
  horizontalAlign: 'center',
  textShadow: '1px 1px 2px 2 #000000',
  letterSpacing: '0.9px',
  paddingTop: '6px',
  fontFamily: 'ui-monospace',
}

const timeRemainingLabel: Partial<VCSSStyleDeclaration> = {
  fontSize: '14px',
  color: 'rgb(200, 200, 200)',
  verticalAlign: 'center',
  horizontalAlign: 'center',
  textShadow: '1px 1px 2px 2 #000000',
  letterSpacing: '0.9px',
  marginBottom: '-10px',
  zIndex: 10,
}

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
    <Panel style={wrapper}>
      <Label style={timeRemainingLabel} text={'Time Remaining'} />
      <Panel style={timeContainer}>
        <Label
          style={{
            ...timeLabel,
            color: time <= 30 ? time <= 10 ? 'red' : 'orange' : 'white',
          }}
          text={formatTime(time)}
        />
      </Panel>
    </Panel>
  );

}

export default RemainingPlayers;