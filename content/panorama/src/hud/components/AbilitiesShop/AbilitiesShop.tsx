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
  const [regularAbilityNames, setRegularAbilityNames] = useState<string[]>([]);
  const [ultimateAbilityNames, setUltimateAbilityNames] = useState<string[]>([]);
  const [renderComponent, setRenderComponent] = useState(true);

  // useEffect(() => {
  //   let timer = -1 as Timer;
  //   if (props.visible === false) {
  //     timer = props.setTimeout(() => {
  //       setRenderComponent(false);
  //     }, 1000);
  //   } else {
  //     setRenderComponent(true);
  //   }
  //   return () => props.clearTimeout(timer);
  // }, [props.visible]);


  useEffect(() => {
    const id = props.setInterval(() => {
      setEntindex(Players.GetLocalPlayerPortraitUnit());
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  useEffect(() => {
    GameEvents.SendCustomGameEventToServer("fetch_shop_abilities", {
      entindex: entindex,
    });
  }, [entindex]);

  useGameEvent('fetch_shop_abilities_ok', (event) => {
    setRegularAbilityNames(Object.values(event.regularAbilities))
    setUltimateAbilityNames(Object.values(event.ultimateAbilities))
  }, []);

  $.Msg("render");

  return (
    <Panel hittest={false} style={Styles.OuterContainer()}>
      {renderComponent && (
        <Panel hittest={true} style={Styles.InnerContainer(!props.visible)}>
          <Title />
          <Panel style={Styles.TopContainer()}>
            <Search />
            <AbilitiesPoints text={'Ability Points:'} />
            <AbilitiesPoints text={'Ultimate Points:'} />
          </Panel>
          <Panel style={Styles.AbilitiesContainer()}>
            <RegularAbilities
              entindex={entindex}
              abilitynames={regularAbilityNames}
            />
            <UltimateAbilities />
          </Panel>
        </Panel>
      )}
    </Panel>
  );

};

export default connector(withReactTimeout(Shop));
