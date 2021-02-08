import React from "react";
import { render } from "react-panorama";
import Minimap from "./components/Minimap/Minimap";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Settings from "./components/Settings/Settings";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import Heroes from "./components/Heroes/Heroes";
import DateTime from "./components/DateTime/DateTime";
import GameTime from "./components/GameTime/GameTime";
import AbilityBar from "./components/AbilityBar/AbilityBar";

const store = configureStore();

export default class App extends React.Component<{}, {}> {

  componentDidMount() {
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
  }

  render() {
    return (
      <Panel hittest={false} className={"appContainer"}>
        <DateTime />
        <Heroes />
        <GameTime />
        <Settings />
        <AbilityBar />
        <ButtonGroup />
        <Minimap />
      </Panel>
    );
  }

}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  $.GetContextPanel()
);
