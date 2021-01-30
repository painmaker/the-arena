import React from "react";
import { render } from "react-panorama";
import CameraZoomSlider from "./CameraZoonSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";

interface IProps {}
interface IState {}

export default class App extends React.Component<IProps, IState> {

  constructor(props : IProps) {
    super(props);
  }

  componentDidMount() {
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
  }

  render() {
    return (
      <Panel style={{ flowChildren: "down", marginTop: '150px', marginLeft: '10px' }}>
        <LockCameraBtn />
        <CameraZoomSlider /> 
      </Panel>
    )
  }

}

render(<App />, $.GetContextPanel());  