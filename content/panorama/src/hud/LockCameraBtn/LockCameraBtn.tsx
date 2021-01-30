import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";

export default function LockCameraBtn() {

    const [toggled, onToggled] = useState(false);

    useEffect(() => {
      if (toggled) {
        GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
      } else {
        GameUI.SetCameraTarget(-1 as EntityIndex);
      }
    }, [toggled]);

    useGameEvent('lock_camera', () => {
      onToggled(toggled => !toggled);
    }, []);

    return (
        <ToggleButton
            selected={toggled}
            text="Lock camera"
            onactivate={() => onToggled(toggled => !toggled)}
        />
    );
}
