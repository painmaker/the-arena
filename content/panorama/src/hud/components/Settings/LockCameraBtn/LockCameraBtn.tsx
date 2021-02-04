import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";

const LockCameraBtn = () => {

  const [toggled, onToggled] = useState(false);

  useEffect(() => {
    if (toggled) {
      GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    } else {
      GameUI.SetCameraTarget(-1 as EntityIndex);
    }
  }, [toggled]);

  useGameEvent("lock_camera", () => {
    onToggled((toggled) => !toggled);
  }, []);

  return (
    <Panel className="settingsItem">
      <Label
        style={{ width: "40%", color: "orange" }}
        text={"Lock Camera:"}
      />
      <Panel style={{ width: "8%", marginLeft: "-4px" }} hittest={false}>
        <ToggleButton
          selected={toggled}
          onactivate={() => onToggled((toggled) => !toggled)}
        />
      </Panel>
      <Label
        style={{
          width: "52%",
          color: "orange",
          fontSize: "16px",
          marginTop: "0.5px",
        }}
        text={toggled ? "Locked" : "Unlocked"}
      />
    </Panel>
  );

}

export default LockCameraBtn;