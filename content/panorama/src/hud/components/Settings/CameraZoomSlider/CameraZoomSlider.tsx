import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Styles } from "./Styles";

type Props = {
  zoom: number,
  setZoom: Dispatch<SetStateAction<number>>
}

/**
 * Requires "Far Z Clip plane" in the "env_fog_controller" entity to be increased to 5000 or more.
 */
const CameraZoomSlider = (props: Props) => {

  // $.Msg("REACT-RENDER: Settings - CameraZoomSlider rendered");

  const { zoom, setZoom } = props;

  useEffect(() => {
    // Hack to initalize the slider caret correctly
    const panel = $("#camera_zoom_slider") as any;
    panel.value = 1600;
  }, []);

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
          onvaluechanged={(event) => setZoom(Math.round(event.value))}
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