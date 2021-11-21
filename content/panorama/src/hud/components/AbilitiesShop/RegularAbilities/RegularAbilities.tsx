import React from "react";
import { useNetTableValues } from "react-panorama";
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

  const playerOwnerID = Entities.GetPlayerOwnerID(selectedUnit);
  const nettable = playerOwnerID !== -1 ? Object.values(useNetTableValues('RegularAbilities')[playerOwnerID]) : [];

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.TitleContainer()}>
        <Label
          text={'Regular Abilities'}
          style={Styles.Title()}
        />
        <Label
          text={nettable.length + ' / 5'}
          style={Styles.AbilityCountLabel()}
        />
        <Label
          text={nettable.length + ' / 5'}
          style={Styles.AbilityCountLabel()}
        />
      </Panel>
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

export default React.memo(RegularAbilities);
