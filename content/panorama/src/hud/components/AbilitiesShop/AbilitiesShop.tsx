import React, { useEffect, useState } from "react";
import Title from "./Title/Title";
import Search from "./Search/Search";
import RegularAbilities from "./RegularAbilities/RegularAbilities";
import UltimateAbilities from "./UltimateAbilities/UltimateAbilities";
import AbilitiesPoints from "./AbilitiesPoints/AbilitiesPoints";
import { useGameEvent, useRegisterForUnhandledEvent } from "react-panorama";
import { HUD_THINK_SLOW, SelectedUnitContext, WindowContext } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { WINDOW } from "../../data/windows";
import Styles from './styles.module.css';

const AbilitiesShop = () => {

  // $.Msg("REACT-RENDER: AbilitiesShop rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);
  const { window, setWindow } = React.useContext(WindowContext);

  const [regularAbilities, setRegularAbilities] = useState<ShopAbility[]>([]);
  const [ultimateAbilities, setUltimateAbilities] = useState<ShopAbility[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(window === WINDOW.ABILITIES_SHOP);
  }, window !== WINDOW.ABILITIES_SHOP ? HUD_THINK_SLOW : 0);

  useEffect(() => {
    if (window === WINDOW.ABILITIES_SHOP) {
      setRegularAbilities([]);
      setUltimateAbilities([]);
      GameEvents.SendCustomGameEventToServer("fetch_shop_abilities", { entindex: selectedUnit });
    }
  }, [selectedUnit, window]);

  useEffect(() => {
    setSearchValue('');
  }, [selectedUnit]);

  useGameEvent('fetch_shop_abilities_ok', (event) => {
    setRegularAbilities(Object.values(event.regularAbilities));
    setUltimateAbilities(Object.values(event.ultimateAbilities));
  }, []);

  useGameEvent("fetch_shop_abilities_error", (event) => {
    GameUI.SendCustomHUDError(event.errorMsg, "General.Item_CantPickUp");
  }, []);

  useGameEvent("purchase_ability_error", (event) => {
    GameUI.SendCustomHUDError(event.errorMsg, "General.Item_CantPickUp");
  }, []);

  useGameEvent("purchase_ability_ok", (event) => {
    Game.EmitSound("General.Buy");
  }, []);

  useGameEvent("dota_player_update_query_unit", (event) => {
    const unit = Players.GetQueryUnit(Players.GetLocalPlayer());
    if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
      setWindow(WINDOW.ABILITIES_SHOP);
    }
  }, [setWindow]);

  useGameEvent("dota_player_update_selected_unit", (event) => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
      setWindow(WINDOW.ABILITIES_SHOP);
    }
  }, [setWindow]);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (window === WINDOW.ABILITIES_SHOP) {
      Game.EmitSound("ui_topmenu_select");
      setWindow(WINDOW.NONE);
    }
  }, [window, setWindow]);

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          className={Styles.container}
          style={{
            transform: window === WINDOW.ABILITIES_SHOP ? "translateX(-10px)" : 'translateX(490px)',
            opacity: window === WINDOW.ABILITIES_SHOP ? "1.0" : "0.0",
          }}
        >
          <Title />
          <Panel className={Styles.topBarContainer}>
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <AbilitiesPoints
              selectedUnit={selectedUnit}
              text={'Ability Points:'}
            />
          </Panel>
          <Panel className={Styles.abilitiesContainer}>
            <RegularAbilities
              selectedUnit={selectedUnit}
              regularAbilities={regularAbilities}
              searchValue={searchValue}
            />
            <UltimateAbilities
              selectedUnit={selectedUnit}
              ultimateAbilities={ultimateAbilities}
              searchValue={searchValue}
            />
          </Panel>
        </Panel>
      )}
    </React.Fragment>
  );

};

export default React.memo(AbilitiesShop);
