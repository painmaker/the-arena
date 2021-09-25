import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { setCameraLocked, setCameraZoom } from "../../actions/settingsAction";
import { SettingsActionTypes } from "../../types/settingsTypes";
import { Timer } from "react-timeout";
import { Styles } from "./Styles";

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

  $.Msg("REACT-RENDER: Settings rendered");

  const { visible, setCameraLocked, setCameraZoom, setTimeout, clearTimeout } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setCameraLocked(true);
    setCameraZoom(1600);
  }, [setCameraLocked, setCameraZoom]);

  useEffect(() => {
    let timer = -1 as Timer;
    if (visible === false) {
      timer = setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => clearTimeout(timer);
  }, [visible, setTimeout, clearTimeout]);

  return (
    <Panel style={Styles.OuterContainer()}>
      {renderComponent && (
        <Panel style={Styles.InnerContainer(visible)}>
          <Title />
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <CameraZoomSlider />
          </Panel>
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <MapZoomSlider />
          </Panel>
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <LockCameraBtn />
          </Panel>
          <Divider />
        </Panel>
      )}
    </Panel>
  );

};

export default connector(withReactTimeout(Settings));
