import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entindex: EntityIndex
  abilitynames: string[],
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
        {(props.abilitynames.length === 0 && props.isLoadingAbilities === true) && (
          <Label
            text={"Loading..."}
            style={Styles.CenterLabel()}
          />
        )}
        {(props.abilitynames.length === 0 && props.isLoadingAbilities === false) && (
          <Label
            text={$.Localize(Entities.GetUnitName(props.entindex)) + " Has No Ultimate Abilities"}
            style={Styles.CenterLabel()}
          />
        )}
        {props.abilitynames.map(abilityname => {
          return (
            <AbilityImage
              key={abilityname}
              entindex={props.entindex}
              abilityname={abilityname}
              searchValue={props.searchValue}
            />
          )
        })}
      </Panel>
    </Panel>
  );
};

export default withReactTimeout(UltimateAbilities);
