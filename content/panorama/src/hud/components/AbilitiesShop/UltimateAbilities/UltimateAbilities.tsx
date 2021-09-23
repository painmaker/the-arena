import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entindex: EntityIndex
  ultimateAbilities: ShopAbility[],
  isLoadingAbilities: boolean,
  searchValue: string,
}

const UltimateAbilities = (props: Props) => {
  return (
    <Panel style={Styles.Container()}>
      <Label
        text={'Ultimate Abilities'}
        style={Styles.Title()}
      />
      <Panel style={Styles.AbilitiesContainer()}>
        {(props.ultimateAbilities.length === 0 && props.isLoadingAbilities === true) && (
          <Label
            text={"Loading..."}
            style={Styles.CenterLabel()}
          />
        )}
        {(props.ultimateAbilities.length === 0 && props.isLoadingAbilities === false) && (
          <Label
            text={$.Localize(Entities.GetUnitName(props.entindex)) + " Has No Ultimate Abilities"}
            style={Styles.CenterLabel()}
          />
        )}
        {props.ultimateAbilities.map(ultimateAbility => {
          return (
            <AbilityImage
              key={ultimateAbility.name}
              entindex={props.entindex}
              shopAbility={ultimateAbility}
              searchValue={props.searchValue}
            />
          )
        })}
      </Panel>
    </Panel>
  );
};

export default withReactTimeout(UltimateAbilities);
