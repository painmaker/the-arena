import React from "react";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex
  regularAbilities: ShopAbility[],
  isLoadingAbilities: boolean,
  searchValue: string,
}

const RegularAbilities = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - RegularAbilities rendered");

  const { selectedUnit, regularAbilities, isLoadingAbilities, searchValue } = props;

  return (
    <Panel style={Styles.Container()}>
      <Label
        text={'Regular Abilities'}
        style={Styles.Title()}
      />
      <Panel style={Styles.AbilitiesContainer()}>
        {(regularAbilities.length === 0 && isLoadingAbilities === false) && (
          <Label
            text={$.Localize(Entities.GetUnitName(selectedUnit)) + " Has No Regular Abilities"}
            style={Styles.CenterLabel()}
          />
        )}
        {regularAbilities.map(regularAbility => {
          return (
            <AbilityImage
              key={regularAbility.name}
              selectedUnit={selectedUnit}
              shopAbility={regularAbility}
              searchValue={searchValue}
            />
          )
        })}
      </Panel>
    </Panel>
  );

};

export default RegularAbilities;
