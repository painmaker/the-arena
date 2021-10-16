import React from "react";
import { useNetTableValues } from "react-panorama";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex
  ultimateAbilities: ShopAbility[],
  isLoadingAbilities: boolean,
  searchValue: string,
}

const UltimateAbilities = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - UltimateAbilities rendered");


  const { selectedUnit, ultimateAbilities, isLoadingAbilities, searchValue } = props;

  const ultimateAbilitiesCount = Object.values(useNetTableValues('UltimateAbilities')[Entities.GetPlayerOwnerID(selectedUnit)]).length;

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.TitleContainer()}>
        <Label
          text={'Ultimate Abilities'}
          style={Styles.Title()}
        />
        <Label
          text={ultimateAbilitiesCount + ' / 1'}
          style={Styles.AbilityCountLabel()}
        />
      </Panel>
      <Panel style={Styles.AbilitiesContainer()}>
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

export default React.memo(UltimateAbilities);
