import React, { useEffect } from "react";
import Minimap from "./components/Minimap/Minimap";
import Settings from "./components/Settings/Settings";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import Heroes from "./components/Heroes/Heroes";
import DateTime from "./components/DateTime/DateTime";
import GameTime from "./components/GameTime/GameTime";
import AbilityBar from "./components/AbilityBar/AbilityBar";
import HealthBar from "./components/HealthBar/HealthBar";
import ManaBar from "./components/ManaBar/ManaBar";
import LevelUp from "./components/LevelUp/LevelUp";
import StatsPanel from "./components/StatsPanel/StatsPanel";
import Character from "./components/Character/Character";
import Debuffs from "./components/Modifiers/Debuffs/Debuffs";
import Buffs from "./components/Modifiers/Buffs/Buffs";
import Inventory from "./components/Inventory/Inventory";

const App = () => {

  useEffect(() => {
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
  }, []);

  return (
    <Panel id={'root'} hittest={false} className={"appContainer"} >
      <DateTime />
      <Heroes />
      <GameTime />
      <Settings />
      <Character />
      <LevelUp />
      <AbilityBar />
      <HealthBar />
      <ManaBar />
      <ButtonGroup />
      <Minimap />
      <Buffs />
      <Debuffs />
      <Inventory />
      <StatsPanel />
    </Panel>
  );

}

export default App;
