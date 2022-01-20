import React, { useEffect, useState } from "react";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import { useTimeout } from "../../hooks/useTimeout";
import { useRegisterForUnhandledEvent } from "react-panorama";
import Styles from './styles.module.css';
import { WINDOW } from "../../data/windows";
import { HUD_THINK_SLOW, WindowContext } from "../../App";

const Settings = () => {

  // $.Msg("REACT-RENDER: Settings rendered");

  const { window, setWindow } = React.useContext(WindowContext);

  const [cameraZoom, setCameraZoom] = useState(1600);
  const [isLocked, setIsLocked] = useState(true);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    GameUI.SetCameraDistance(cameraZoom);
  }, [cameraZoom]);

  useEffect(() => {
    if (isLocked) {
      GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    } else {
      GameUI.SetCameraTarget(-1 as EntityIndex);
    }
  }, [isLocked]);

  useTimeout(() => {
    setRenderComponent(window === WINDOW.SETTINGS);
  }, window !== WINDOW.SETTINGS ? HUD_THINK_SLOW : 0);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (window === WINDOW.SETTINGS) {
      Game.EmitSound("ui_topmenu_select");
      setWindow(WINDOW.NONE);
    }
  }, [window, setWindow]);

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          className={Styles.container}
          style={window === WINDOW.SETTINGS ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
        >
          <Title />
          <Divider />
          <Panel className={Styles.entry}>
            <CameraZoomSlider
              cameraZoom={cameraZoom}
              setCameraZoom={setCameraZoom}
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

export default React.memo(Settings);
