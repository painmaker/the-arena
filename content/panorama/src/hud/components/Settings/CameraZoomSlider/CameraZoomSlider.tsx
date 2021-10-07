import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";

/**
 * Requires "Far Z Clip plane" in the "env_fog_controller" entity to be increased to 5000 or more.
 */
const CameraZoomSlider = () => {

  // $.Msg("REACT-RENDER: Settings - CameraZoomSlider rendered");

  const [zoom, setZoom] = useState(1600);

  return (
    <React.Fragment>
      <Label
        style={Styles.TextLabel()}
        text={"Camera Zoom:"}
      />
      <Panel style={Styles.SliderContainer()}>
        <Slider
          id={"camera_zoom_slider"}
          className={"HorizontalSlider"}
          direction={"horizontal"}
          value={zoom}
          min={800}
          max={2000}
          onvaluechanged={(e) => {
            const value = Math.round(e.value);
            GameUI.SetCameraDistance(value);
            setZoom(e.value);
          }}
        />
      </Panel>
      <Label
        style={Styles.NumberLabel()}
        text={zoom}
      />
    </React.Fragment>
  );
}

export default React.memo(CameraZoomSlider);