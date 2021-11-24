import React, { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setMinimapZoom } from "../../../actions/minimapActions";
import { RootState } from "../../../reducers/rootReducer";
import { MinimapActionTypes } from "../../../types/minimapTypes";
import Styles from "./styles.module.css";

const mapStateToProps = (state: RootState) => ({
  zoom: state.minimapReducer.zoom,
});

const mapDispatchToProps = (dispatch: Dispatch<MinimapActionTypes>) => ({
  setMinimapZoom: (zoom: number) => dispatch(setMinimapZoom(zoom)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const MapZoomSlider = (props: Props) => {

  // $.Msg("REACT-RENDER: Settings - MapZoomSlider rendered");

  useEffect(() => {
    // Hack to initalize the slider caret correctly
    const panel = $("#map_zoom_slider") as any;
    panel.value = props.zoom;
  }, []);

  return (
    <React.Fragment>
      <Label
        className={Styles.textLabel}
        text={"Minimap Zoom:"}
      />
      <Panel className={Styles.sliderContainer}>
        <Slider
          id={"map_zoom_slider"}
          className={"HorizontalSlider"}
          direction={"horizontal"}
          value={props.zoom}
          min={3}
          max={10}
          onvaluechanged={(e) => props.setMinimapZoom(Math.round(e.value))}
        />
      </Panel>
      <Label
        className={Styles.numberLabel}
        text={props.zoom}
      />
    </React.Fragment>
  );

};

export default React.memo(connector(MapZoomSlider));
