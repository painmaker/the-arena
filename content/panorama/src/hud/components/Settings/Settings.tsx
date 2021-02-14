import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import CloseBtn from "./CloseBtn/CloseBtn";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { useGameEvent } from "react-panorama";
import { setCameraLocked, setCameraZoom } from "../../actions/settingsAction";
import { SettingsActionTypes } from "../../types/settingsTypes";

const mapStateToProps = (state: RootState) => ({
  visible: state.settingsReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setCameraLocked: (locked: boolean) => dispatch(setCameraLocked(locked)),
  setCameraZoom: (zoom: number) => dispatch(setCameraZoom(zoom)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const Settings = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(false);

  useGameEvent("initialize_camera", () => {
    props.setCameraLocked(true);
    props.setCameraZoom(1600);
  }, []);

  useEffect(() => {
    let timer = -1;
    if (props.visible === false) {
      timer = props.setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.visible]);

  return (
    <Panel hittest={false} style={{ width: "100%", height: "100%" }}>
      { renderComponent && (
        <React.Fragment>
          <CloseBtn />
          <Panel
            style={props.visible ? { transform: 'translateX(-510px)', opacity: '1.0' } : {}}
            className={"settingsWindow"}
          >
            <Title />
            <Divider />
            <CameraZoomSlider />
            <Divider />
            <MapZoomSlider />
            <Divider />
            <LockCameraBtn />
          </Panel>
        </React.Fragment>
      )}
    </Panel>
  );

};

export default connector(withReactTimeout(Settings));
