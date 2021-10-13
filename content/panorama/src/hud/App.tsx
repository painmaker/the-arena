import React, { useEffect, useState } from "react";
import { useNetTableValues } from "react-panorama";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
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
import Shop from "./components/Shop/Shop";
import HeroSelection from "./components/HeroSelection/HeroSelection";
import Loading from "./components/Loading/Loading";
import AbilitiesShop from "./components/AbilitiesShop/AbilitiesShop";
import FloatingContainer from "./components/FloatingContainer/FloatingContainer";
import Messages from "./components/Messages/Messages";

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

type Props = ReactTimeoutProps & {
  // ownProps
}

const App = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;

  const [useCustomUI, setUseCustomUI] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));

  useEffect(() => {
    const update = () => {
      const unitToSelect = getGameUnitSelected();
      if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
        setSelectedUnit(unitToSelect)
      }
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [setInterval, clearInterval]);

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
            onactivate={() => setUseCustomUI(prevState => !prevState)}
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
              <Character selectedUnit={selectedUnit} />
              <Shop selectedUnit={selectedUnit} />
              <AbilityBar selectedUnit={selectedUnit} />
              <ManaBar selectedUnit={selectedUnit} />
              <HealthBar selectedUnit={selectedUnit} />
              <ButtonGroup />
              <Minimap />
              <Buffs selectedUnit={selectedUnit} />
              <Debuffs selectedUnit={selectedUnit} />
              <Inventory selectedUnit={selectedUnit} />
              <Stats selectedUnit={selectedUnit} />
              <AbilitiesShop selectedUnit={selectedUnit} />
              <FloatingContainer />
              <Messages />
            </React.Fragment>
          )}
        </Loading>
      )}
    </Panel>
  );

}

export default ReactTimeout(App);
