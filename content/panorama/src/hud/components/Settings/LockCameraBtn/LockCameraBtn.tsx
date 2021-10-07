import React, { useState } from "react";
import { Styles } from "./Styles";

const LockCameraBtn = () => {

  // $.Msg("REACT-RENDER: Settings - LockCameraBtn rendered");

  const [isLocked, setIsLocked] = useState(true);

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.LeftLabel()}
        text={"Lock Camera:"}
      />
      <Panel style={Styles.ToggleBtnContainer()}>
        <ToggleButton
          selected={isLocked}
          onactivate={() => {
            if (isLocked) {
              GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
            } else {
              GameUI.SetCameraTarget(-1 as EntityIndex);
            }
            setIsLocked(prevState => !prevState);
          }}
        />
      </Panel>
      <Label
        style={Styles.RightLabel()}
        text={isLocked ? "Locked" : "Unlocked"}
      />
    </Panel>

  );
}

export default React.memo(connector(LockCameraBtn));