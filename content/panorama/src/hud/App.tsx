import React, { useEffect } from "react";
import Minimap from "./components/Minimap/Minimap";
import Settings from "./components/Settings/Settings";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import Heroes from "./components/Heroes/Heroes";
import GameTime from "./components/GameTime/GameTime";
import AbilityBar from "./components/AbilityBar/AbilityBar";
import HealthBar from "./components/HealthBar/HealthBar";
import ManaBar from "./components/ManaBar/ManaBar";
import Stats from "./components/Stats/Stats";
import Character from "./components/Character/Character";
import Debuffs from "./components/Modifiers/Debuffs/Debuffs";
import Buffs from "./components/Modifiers/Buffs/Buffs";
import Inventory from "./components/Inventory/Inventory";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./reducers/rootReducer";
import { setCameraZoom, setUseCustomUI } from "./actions/settingsAction";
import { SettingsActionTypes } from "./types/settingsTypes";
import Shop from "./components/Shop/Shop";
import HeroSelection from "./components/HeroSelection/HeroSelection";
import { useNetTableValues } from "react-panorama";
import Loading from "./components/Loading/Loading";
import AbilitiesShop from "./components/AbilitiesShop/AbilitiesShop";
import { setSelectedUnit } from "./actions/selectedUnitActions";
import { Dispatch } from "redux";
import { SelectedUnitActionTypes } from "./types/selectedUnitTypes";
import withReactTimeout, { ReactTimeoutProps } from "./hoc/ReactTimeout";
import FloatingBars from "./components/FloatingBars/FloatingBars";

export const HUD_THINK_FAST = 50;
export const HUD_THINK_MEDIUM = 100;
export const HUD_THINK_SLOW = 1000;
export const SCHEDULE_THINK_FAST = 0.03;
export const SCHEDULE_THINK_MEDIUM = 0.1;
export const SCHEDULE_THINK_SLOW = 1.0;

const mapStateToProps = (state: RootState) => ({
  useCustomUI: state.settingsReducer.useCustomUI,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes | SelectedUnitActionTypes>) => ({
  setUseCustomUI: (useCustomUI: boolean) => dispatch(setUseCustomUI(useCustomUI)),
  setCameraZoom: (zoom: number) => dispatch(setCameraZoom(zoom)),
  setSelectedUnit: (selectedUnit: EntityIndex) => dispatch(setSelectedUnit(selectedUnit)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const excludedUnits = [
  "shopkeeper_abilities"
]

const getGameUnitSelected = () => {

  const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer());
  if (queryUnit !== -1) {
    return queryUnit;
  }

  const portraitUnit = Players.GetLocalPlayerPortraitUnit();
  if (portraitUnit !== -1) {
    return portraitUnit
  }

  return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());

}

const App = (props: Props) => {

  const { useCustomUI, setCameraZoom, setSelectedUnit, setInterval, clearInterval, setUseCustomUI } = props;

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;

  useEffect(() => {
    setCameraZoom(1600);
  }, [setCameraZoom]);

  useEffect(() => {
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, !useCustomUI);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ELEMENT_COUNT, !useCustomUI);
  }, [useCustomUI]);

  useEffect(() => {
    const update = () => {
      const unitToSelect = getGameUnitSelected();
      if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
        setSelectedUnit(unitToSelect)
      }
    };
    update();
    const id = setInterval(update, HUD_THINK_FAST);
    return () => clearInterval(id);
  }, [setSelectedUnit, setInterval, clearInterval]);

  return (
    <Panel id={'root'} hittest={false} className={"appContainer"} >
      {/* <Chat hasPickedHero={hasPickedHero} /> */}
      {(!hasPickedHero) && (
        <HeroSelection />
      )}
      {hasPickedHero && (
        <Loading>
          <ToggleButton
            className={'useCustomUIBtn'}
            selected={useCustomUI}
            onactivate={() => setUseCustomUI(!useCustomUI)}
          >
            <Label
              className={'useCustomUILabel'}
              text={'Use Custom UI'}
            />
          </ToggleButton>
          {useCustomUI && (
            <React.Fragment>
              <Heroes />
              <GameTime />
              <Settings />
              <Character />
              <Shop />
              <AbilityBar />
              <ManaBar />
              <HealthBar />
              <ButtonGroup />
              <Minimap />
              <Buffs />
              <Debuffs />
              <Inventory />
              {/* <SelectedUnit /> */}
              <Stats />
              <AbilitiesShop />
              <FloatingBars />
            </React.Fragment>
          )}
        </Loading>
      )}
    </Panel>
  );

}

export default connector(withReactTimeout(App));
