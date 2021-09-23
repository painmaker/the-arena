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
});

const mapDispatchToProps = (dispatch: Dispatch<AbilitiesShopTypes>) => ({
  setShopVisible: (visible: boolean) => dispatch(setAbilitiesShopVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const Shop = (props: Props) => {

  const [entindex, setEntindex] = useState(Players.GetLocalPlayerPortraitUnit());
  const [regularAbilities, setRegularAbilities] = useState<ShopAbility[]>([]);
  const [ultimateAbilities, setUltimateAbilities] = useState<ShopAbility[]>([]);
  const [isLoadingAbilities, setIsLoadingAbilities] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (props.visible === false) {
      timer = props.setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.visible]);

  useEffect(() => {
    setRegularAbilities([]);
    setUltimateAbilities([]);
    setIsLoadingAbilities(true);
    GameEvents.SendCustomGameEventToServer("fetch_shop_abilities", { entindex: entindex });
  }, [entindex]);

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
    let newEntindex = Players.GetQueryUnit(Players.GetLocalPlayer());
    if (Entities.GetUnitName(newEntindex) === 'shopkeeper_abilities') {
      newEntindex = Entities.IsRealHero(entindex) ? entindex : Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
      GameUI.SelectUnit(newEntindex, false);
      props.setShopVisible(true);
    }
    setEntindex(newEntindex);
  }, [entindex]);

  useGameEvent("dota_player_update_selected_unit", (event) => {
    let newEntindex = Players.GetLocalPlayerPortraitUnit();
    if (Entities.GetUnitName(newEntindex) === 'shopkeeper_abilities') {
      newEntindex = Entities.IsRealHero(entindex) ? entindex : Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
      GameUI.SelectUnit(newEntindex, false);
      props.setShopVisible(true);
    }
    setEntindex(newEntindex);
  }, [entindex]);

  return (
    <Panel hittest={false} style={Styles.OuterContainer()}>
      {renderComponent && (
        <Panel hittest={true} style={Styles.InnerContainer(props.visible)}>
          <Title />
          <Panel style={Styles.TopContainer()}>
            <Search setSearchValue={setSearchValue} />
            <AbilitiesPoints text={'Ability Points:'} />
            {/* <AbilitiesPoints text={'Ultimate Points:'} /> */}
          </Panel>
          <Panel style={Styles.AbilitiesContainer()}>
            <RegularAbilities
              entindex={entindex}
              regularAbilities={regularAbilities}
              isLoadingAbilities={isLoadingAbilities}
              searchValue={searchValue}
            />
            <UltimateAbilities
              entindex={entindex}
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

export default connector(withReactTimeout(Shop));
