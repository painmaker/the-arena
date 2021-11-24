import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import { setCameraLocked, setCameraZoom, setSettingsVisible } from "../../actions/settingsAction";
import { SettingsActionTypes } from "../../types/settingsTypes";
import { HUD_THINK_SLOW } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { useRegisterForUnhandledEvent } from "react-panorama";
import Styles from './styles.module.css';

const mapStateToProps = (state: RootState) => ({
  visible: state.settingsReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setSettingsVisible: (visible: boolean) => dispatch(setSettingsVisible(visible)),
  setCameraLocked: (locked: boolean) => dispatch(setCameraLocked(locked)),
  setCameraZoom: (zoom: number) => dispatch(setCameraZoom(zoom)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Settings = (props: Props) => {

  // $.Msg("REACT-RENDER: Settings rendered");

  const { visible, setSettingsVisible } = props;

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

  useTimeout(() => {
    setRenderComponent(visible);
  }, visible === false ? HUD_THINK_SLOW : 0);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (visible) {
      Game.EmitSound("ui_topmenu_select");
    }
    setSettingsVisible(false);
  }, [visible, setSettingsVisible]);

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          className={Styles.container}
          style={visible ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
        >
          <Title />
          <Divider />
          <Panel className={Styles.entry}>
            <CameraZoomSlider
              zoom={zoom}
              setZoom={setZoom}
            />
          </Panel>
          <Divider />
          <Panel className={Styles.entry}>
            <MapZoomSlider />
          </Panel>
          <Divider />
          <Panel className={Styles.entry}>
            <LockCameraBtn
              isLocked={isLocked}
              setIsLocked={setIsLocked}
            />
          </Panel>
          <Divider />
        </Panel>
      )}
    </React.Fragment>
  );

};

export default React.memo(connector(Settings));
