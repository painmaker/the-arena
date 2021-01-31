import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";

export default function LockCameraBtn() {
    const [toggled, onToggled] = useState(false);

    useEffect(() => {
        if (toggled) {
            GameUI.SetCameraTarget(
                Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
            );
        } else {
            GameUI.SetCameraTarget(-1 as EntityIndex);
        }
    }, [toggled]);

    useGameEvent(
        "lock_camera",
        () => {
            onToggled((toggled) => !toggled);
        },
        []
    );

    return (
        <Panel
            style={{
                flowChildren: "right",
                width: "100%",
                verticalAlign: "center",
            }}
        >
            <Label
                style={{ width: "50%", color: "orange" }}
                text={"Lock Camera:"}
            />
            <Panel style={{ width: "25%" }} hittest={false}>
                <ToggleButton
                    selected={toggled}
                    onactivate={() => onToggled((toggled) => !toggled)}
                />
            </Panel>

            <Label
                style={{ width: '25%', marginLeft: "10px", color: "orange" }}
                text={toggled ? "Locked" : "Unlocked"}
            />
        </Panel>
    );
}
