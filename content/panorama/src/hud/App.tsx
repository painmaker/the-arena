import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNetTableValues, useRegisterForUnhandledEvent } from "react-panorama";
import Minimap from "./components/Minimap/Minimap";
import Settings from "./components/Settings/Settings";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import Heroes from "./components/Heroes/Heroes";
import AbilityBar from "./components/AbilityBar/AbilityBar";
import Health from "./components/Health/Health";
import Mana from "./components/Mana/Mana";
import Character from "./components/Character/Character";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import Buffs from "./components/Modifiers/Buffs/Buffs";
import Inventory from "./components/Inventory/Inventory";
import ItemsShop from "./components/ItemsShop/ItemsShop";
import HeroSelection from "./components/HeroSelection/HeroSelection";
import Loading from "./components/Loading/Loading";
import AbilitiesShop from "./components/AbilitiesShop/AbilitiesShop";
import FloatingContainer from "./components/FloatingContainer/FloatingContainer";
import Messages from "./components/Messages/Messages";
import { useInterval } from "./hooks/useInterval";
import "./global.css";
import Styles from "./app.module.css";
import { WINDOW } from "./data/windows";

export const HUD_THINK_FAST = 30;
export const HUD_THINK_MEDIUM = 100;
export const HUD_THINK_SLOW = 1000;

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
interface SelectedUnitContext {
  selectedUnit: EntityIndex,
}
interface WindowContext {
  window: WINDOW,
  setWindow: Dispatch<SetStateAction<WINDOW>>
}

export const SelectedUnitContext = React.createContext<SelectedUnitContext>({
  selectedUnit: Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()),
});

export const WindowContext = React.createContext<WindowContext>({
  window: WINDOW.NONE,
  setWindow: () => { }
});

const App = () => {

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;

  const [useCustomUI, setUseCustomUI] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
  const [window, setWindow] = useState(WINDOW.NONE);

  useEffect(() => {
    GameUI.SetCameraDistance(1600);
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
  }, []);

  useInterval(() => {
    const unitToSelect = getGameUnitSelected();
    if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
      setSelectedUnit(unitToSelect)
    }
  }, HUD_THINK_FAST)

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
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false);
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

  useRegisterForUnhandledEvent('Cancelled', () => {
    GameEvents.SendEventClientSide('set_window', { window: WINDOW.NONE });
    Game.EmitSound("ui_topmenu_select");
  }, []);

  return (
    <React.Fragment>
      <Panel
        id={'root'}
        className={Styles.container}
        hittest={false}
      >
        {(!hasPickedHero) && (
          <HeroSelection />
        )}
        {hasPickedHero && (
          <Loading>
            <ToggleButton
              className={Styles.useCustomUIBtn}
              selected={useCustomUI}
              onactivate={() => setUseCustomUI(prevState => !prevState)}
            >
              <Label className={Styles.useCustomUILabel} text={'Custom UI'} />
            </ToggleButton>
            {useCustomUI && (
              <React.Fragment>
                <Heroes />
                <Minimap />
                <FloatingContainer />
                <Messages />
                <SelectedUnitContext.Provider value={{ selectedUnit }}>
                  <AbilityBar />
                  <Buffs />
                  <Mana />
                  <Health />
                  <Inventory />
                  <Character />
                  <WindowContext.Provider value={{ window, setWindow }}>
                    <ButtonGroup />
                    <Settings />
                    <CharacterDetails />
                    <ItemsShop />
                    <AbilitiesShop />
                  </WindowContext.Provider>
                </SelectedUnitContext.Provider>
                <Panel className={Styles.bottomCenterBackground} />
                <Panel className={Styles.bottomCenterLeftFlare} />
                <Panel className={Styles.bottomCenterRightFlare} />
              </React.Fragment>

            )}
          </Loading>
        )}
      </Panel>
    </React.Fragment>
  );

}

export default App;
