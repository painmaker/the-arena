import React, { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCameraZoom } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  zoom: state.settingsReducer.cameraZoom,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setCameraZoom: (zoom: number) => dispatch(setCameraZoom(zoom)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

/**
 * Requires "Far Z Clip plane" in the "env_fog_controller" entity to be increased to 5000 or more.
 */
const CameraZoomSlider = (props: Props) => {

  $.Msg("REACT-RENDER: Settings - CameraZoomSlider rendered");

  useEffect(() => {
    // Hack to initalize the slider caret correctly
    const panel = $("#camera_zoom_slider") as any;
    panel.value = props.zoom;
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
          value={props.zoom}
          min={800}
          max={2000}
          onvaluechanged={(e) => props.setCameraZoom(Math.round(e.value))}
        />
      </Panel>
      <Label
        style={Styles.NumberLabel()}
        text={props.zoom}
      />
    </React.Fragment>
  );
}

export default React.memo(connector(CameraZoomSlider));