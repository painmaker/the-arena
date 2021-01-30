import React, { useEffect, useState } from "react";

/**
 * Requires "Far Z Clip plane" in the "env_fog_controller" entity to be increased to 5000 or more.
 */
export default function CameraZoomSlider() {

    const [value, onValueChanged] = useState(1600);

    useEffect(() => {
        GameUI.SetCameraDistance(value);
    }, [value]);

    useEffect(() => {
      // Hack to to initalize slider correct
      const panel = $("#camera_zoom_slider") as any;
      panel.value = value; 
    }, []);

    return (
        <Panel style={{ flowChildren: "right", marginTop: "15px" }}>
            <Panel style={{ width: "150px" }}>
                <Slider
                    id={'camera_zoom_slider'}
                    className={"HorizontalSlider"}
                    direction={"horizontal"}
                    value={value}
                    min={800}
                    max={2000}
                    onvaluechanged={(e) => onValueChanged(Math.round(e.value))}
                />
            </Panel>
            <Panel style={{ marginTop: "5px", marginLeft: "5px" }}>
                <Label text={value} />
            </Panel>
        </Panel>
    );
    
}
