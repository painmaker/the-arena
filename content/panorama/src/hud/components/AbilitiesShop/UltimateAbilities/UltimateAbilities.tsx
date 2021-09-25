import React from "react";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex
  ultimateAbilities: ShopAbility[],
  isLoadingAbilities: boolean,
  searchValue: string,
}

const UltimateAbilities = (props: Props) => {

  const { selectedUnit, ultimateAbilities, isLoadingAbilities, searchValue } = props;

  return (
    <Panel style={Styles.Container()}>
      <Label
        text={'Ultimate Abilities'}
        style={Styles.Title()}
      />
      <Panel style={Styles.AbilitiesContainer()}>
        {/* 
        {(ultimateAbilities.length === 0 && isLoadingAbilities === true) && (
          <Label
            text={"Loading..."}
            style={Styles.CenterLabel()}
          />
        )}
        */}
        {(ultimateAbilities.length === 0 && isLoadingAbilities === false) && (
          <Label
            text={$.Localize(Entities.GetUnitName(selectedUnit)) + " Has No Ultimate Abilities"}
            style={Styles.CenterLabel()}
          />
        )}
        {ultimateAbilities.map(ultimateAbility => {
          return (
            <AbilityImage
              key={ultimateAbility.name}
              selectedUnit={selectedUnit}
              shopAbility={ultimateAbility}
              searchValue={searchValue}
            />
          )
        })}
      </Panel>
    </Panel>
  );

};

export default UltimateAbilities;
