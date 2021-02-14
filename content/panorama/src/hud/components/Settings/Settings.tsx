import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import CloseBtn from "./CloseBtn/CloseBtn";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";

const mapStateToProps = (state: RootState) => ({
  visible: state.settingsReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {};

const Settings = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(false);

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
