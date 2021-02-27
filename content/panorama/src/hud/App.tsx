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
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, !props.useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, !props.useCustomUI);
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
