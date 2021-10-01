import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { Timer } from "react-timeout";
import { Dispatch } from "redux";
import { AbilitiesShopTypes } from "../../types/abilitiesShopTypes";
import { setAbilitiesShopVisible } from "../../actions/abilitiesShopActions";
import { Styles } from "./Styles";
import Title from "./Title/Title";
import Search from "./Search/Search";
import RegularAbilities from "./RegularAbilities/RegularAbilities";
import UltimateAbilities from "./UltimateAbilities/UltimateAbilities";
import AbilitiesPoints from "./AbilitiesPoints/AbilitiesPoints";
import { useGameEvent } from "react-panorama";

const mapStateToProps = (state: RootState) => ({
  visible: state.abilitiesShopReducer.visible,
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const mapDispatchToProps = (dispatch: Dispatch<AbilitiesShopTypes>) => ({
  setShopVisible: (visible: boolean) => dispatch(setAbilitiesShopVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const AbilitiesShop = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop rendered");

  const { visible, selectedUnit, setShopVisible, setTimeout, clearTimeout } = props;

  const [regularAbilities, setRegularAbilities] = useState<ShopAbility[]>([]);
  const [ultimateAbilities, setUltimateAbilities] = useState<ShopAbility[]>([]);
  const [isLoadingAbilities, setIsLoadingAbilities] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (visible === false) {
      timer = setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => clearTimeout(timer);
  }, [visible, clearTimeout, setTimeout]);

  useEffect(() => {
    if (visible) {
      setRegularAbilities([]);
      setUltimateAbilities([]);
      setIsLoadingAbilities(true);
      GameEvents.SendCustomGameEventToServer("fetch_shop_abilities", { entindex: selectedUnit });
    }
  }, [selectedUnit, visible]);

  useGameEvent('fetch_shop_abilities_ok', (event) => {
    setRegularAbilities(Object.values(event.regularAbilities));
    setUltimateAbilities(Object.values(event.ultimateAbilities));
    setIsLoadingAbilities(false);
  }, []);

  useGameEvent("fetch_shop_abilities_error", (event) => {
    GameUI.SendCustomHUDError(event.errorMsg, "General.Item_CantPickUp");
    setIsLoadingAbilities(false);
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
      setShopVisible(true);
    }
  }, [setShopVisible]);

  useGameEvent("dota_player_update_selected_unit", (event) => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
      setShopVisible(true);
    }
  }, [setShopVisible]);

  return (
    <Panel style={Styles.OuterContainer()}>
      {renderComponent && (
        <Panel style={Styles.InnerContainer(visible)}>
          <Title selectedUnit={selectedUnit} />
          <Panel style={Styles.TopContainer()}>
            <Search setSearchValue={setSearchValue} />
            <AbilitiesPoints
              selectedUnit={selectedUnit}
              text={'Ability Points:'}
            />
          </Panel>
          <Panel style={Styles.AbilitiesContainer()}>
            <RegularAbilities
              selectedUnit={selectedUnit}
              regularAbilities={regularAbilities}
              isLoadingAbilities={isLoadingAbilities}
              searchValue={searchValue}
            />
            <UltimateAbilities
              selectedUnit={selectedUnit}
              ultimateAbilities={ultimateAbilities}
              isLoadingAbilities={isLoadingAbilities}
              searchValue={searchValue}
            />
          </Panel>
        </Panel>
      )}
    </Panel>
  );

};

export default connector(withReactTimeout(AbilitiesShop));
