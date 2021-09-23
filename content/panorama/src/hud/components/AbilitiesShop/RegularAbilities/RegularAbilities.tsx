import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entindex: EntityIndex
  regularAbilities: ShopAbility[],
  isLoadingAbilities: boolean,
  searchValue: string,
}

const RegularAbilities = (props: Props) => {
  return (
    <Panel style={Styles.Container()}>
      <Label
        text={'Regular Abilities'}
        style={Styles.Title()}
      />
      <Panel style={Styles.AbilitiesContainer()}>
        {(props.regularAbilities.length === 0 && props.isLoadingAbilities === true) && (
          <Label
            text={"Loading..."}
            style={Styles.CenterLabel()}
          />
        )}
        {(props.regularAbilities.length === 0 && props.isLoadingAbilities === false) && (
          <Label
            text={$.Localize(Entities.GetUnitName(props.entindex)) + " Has No Regular Abilities"}
            style={Styles.CenterLabel()}
          />
        )}
        {props.regularAbilities.map(regularAbility => {
          return (
            <AbilityImage
              key={regularAbility.name}
              entindex={props.entindex}
              shopAbility={regularAbility}
              searchValue={props.searchValue}
            />
          )
        })}
      </Panel>
    </Panel>
  );
};

export default withReactTimeout(RegularAbilities);

/*

  */