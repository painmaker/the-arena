import React, { Dispatch, useEffect } from "react";
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
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./reducers/rootReducer";
import { setUseCustomUI } from "./actions/settingsAction";
import { SettingsActionTypes } from "./types/settingsTypes";

const mapStateToProps = (state: RootState) => ({
  useCustomUI: state.settingsReducer.useCustomUI,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setUseCustomUI: (useCustomUI: boolean) => dispatch(setUseCustomUI(useCustomUI)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

};

const App = (props: Props) => {

  useEffect(() => {
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ELEMENT_COUNT, !props.useCustomUI);
  }, [props.useCustomUI]);

  return (
    <Panel id={'root'} hittest={false} className={"appContainer"} >
      <ToggleButton
        className={'useCustomUIBtn'}
        selected={props.useCustomUI}
        onactivate={() => props.setUseCustomUI(!props.useCustomUI)}
      >
        <Label
          className={'useCustomUILabel'}
          text={'Use Custom UI'}
        />
      </ToggleButton>
      { props.useCustomUI && (
        <React.Fragment>
          {/* <DateTime /> */}
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
        </React.Fragment>
      )}
    </Panel>
  );

}

export default connector(App);
