import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex
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
            text={$.Localize(Entities.GetUnitName(props.selectedUnit)) + " Has No Ultimate Abilities"}
            style={Styles.CenterLabel()}
          />
        )}
        {props.ultimateAbilities.map(ultimateAbility => {
          return (
            <AbilityImage
              key={ultimateAbility.name}
              selectedUnit={props.selectedUnit}
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
