import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import { setCameraLocked, setCameraZoom } from "../../actions/settingsAction";
import { SettingsActionTypes } from "../../types/settingsTypes";
import { Styles } from "./Styles";
import { HUD_THINK_SLOW } from "../../App";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

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

  // $.Msg("REACT-RENDER: Settings rendered");

  const { visible, setTimeout, clearTimeout } = props;

  const [zoom, setZoom] = useState(1600);
  const [isLocked, setIsLocked] = useState(true);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    GameUI.SetCameraDistance(zoom);
  }, [zoom]);

  useEffect(() => {
    if (isLocked) {
      GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    } else {
      GameUI.SetCameraTarget(-1 as EntityIndex);
    }
  }, [isLocked]);

  useEffect(() => {
    let id: ReactTimeout.Timer | undefined = undefined;
    if (visible === false) {
      const update = () => setRenderComponent(false);
      id = setTimeout!(update, HUD_THINK_SLOW);
    } else {
      setRenderComponent(true);
    }
    return () => {
      if (id) {
        clearTimeout!(id)
      }
    }
  }, [visible, setTimeout, clearTimeout]);

  return (
    <Panel style={Styles.OuterContainer()}>
      {renderComponent && (
        <Panel style={Styles.InnerContainer(visible)}>
          <Title />
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <CameraZoomSlider
              zoom={zoom}
              setZoom={setZoom}
            />
          </Panel>
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <MapZoomSlider />
          </Panel>
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <LockCameraBtn
              isLocked={isLocked}
              setIsLocked={setIsLocked}
            />
          </Panel>
          <Divider />
        </Panel>
      )}
    </Panel>
  );

};

export default React.memo(connector(ReactTimeout(Settings)));
