import React, { useEffect, useState } from "react";
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
import { useNetTableValues } from "react-panorama";
import Loading from "./components/Loading/Loading";
import AbilitiesShop from "./components/AbilitiesShop/AbilitiesShop";
import FloatingContainer from "./components/FloatingContainer/FloatingContainer";
import { useSelectedUnit } from "./hooks/useSelectedUnit";

export const SCHEDULE_THINK_FAST = 0.03;
export const SCHEDULE_THINK_MEDIUM = 0.1;
export const SCHEDULE_THINK_SLOW = 1.0;

const App = () => {

  const selectedUnit = useSelectedUnit();
  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const [useCustomUI, setUseCustomUI] = useState(true);
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;

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
              {/* <SelectedUnit /> */}
              <Stats selectedUnit={selectedUnit} />
              <AbilitiesShop selectedUnit={selectedUnit} />
              <FloatingContainer />
            </React.Fragment>
          )}
        </Loading>
      )}
    </Panel>
  );

}

export default App;
