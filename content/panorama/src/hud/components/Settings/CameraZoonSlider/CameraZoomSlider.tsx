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
        // Hack to initalize the slider caret correctly
        const panel = $("#camera_zoom_slider") as any;
        panel.value = value;
    }, []);

    return (
        <Panel
            style={{
                flowChildren: "right",
                width: "100%",
                marginTop: "0px",
            }}
        >
            <Label
                style={{ width: "35%", marginTop: "5px", color: "orange" }}
                text={"Camera Zoom: "}
            />
            <Panel style={{ width: "40%" }}>
                <Slider
                    id={"camera_zoom_slider"}
                    className={"HorizontalSlider"}
                    direction={"horizontal"}
                    value={value}
                    min={800}
                    max={2000}
                    onvaluechanged={(e) => onValueChanged(Math.round(e.value))}
                />
            </Panel>
            <Label
                style={{
                    width: "25%",
                    marginTop: "5px",
                    marginLeft: "10px",
                    color: "orange",
                }}
                text={value}
            />
        </Panel>
    );
}
