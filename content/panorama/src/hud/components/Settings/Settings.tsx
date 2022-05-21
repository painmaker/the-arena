import React, { useEffect, useState } from "react";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import { useTimeout } from "../../hooks/useTimeout";
import { useGameEvent } from "react-panorama";
import Styles from './styles.module.css';
import { WINDOW } from "../../data/windows";
import { HUD_THINK_SLOW } from "../../App";

const Settings = () => {

  // $.Msg("REACT-RENDER: Settings rendered");

  const [mapZoom, setMapZoom] = useState(5);
  const [cameraZoom, setCameraZoom] = useState(1600);
  const [isLocked, setIsLocked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(isOpen);
  }, !isOpen ? HUD_THINK_SLOW : 0);

  useGameEvent('set_window', (event) => {
    setIsOpen(event.window === WINDOW.SETTINGS);
  }, []);

  useEffect(() => {
    GameEvents.SendEventClientSide('set_map_zoom', { mapZoom });
  }, [mapZoom])

  useEffect(() => {
    GameUI.SetCameraDistance(cameraZoom);
  }, [cameraZoom]);

  useEffect(() => {
    GameEvents.SendEventClientSide('set_is_camera_locked', { isLocked });
    if (isLocked) {
      GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    } else {
      GameUI.SetCameraTarget(-1 as EntityIndex);
    }
  }, [isLocked]);

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          onactivate={() => false}
          className={Styles.container}
          style={isOpen ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
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
            <MapZoomSlider
              mapZoom={mapZoom}
              setMapZoom={setMapZoom}
            />
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
