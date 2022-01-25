import React from "react";
import { useNetTableValues } from "react-panorama";
import AbilityImage from "../AbilityImage/AbilityImage";
import Styles from './styles.module.css'

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
    <Panel className={Styles.container}>
      <Panel className={Styles.titleContainer}>
        <Label
          text={'Regular Abilities'}
          className={Styles.title}
        />
        <Label
          text={nettable.length + ' / 5'}
          className={Styles.abilityCountLabel}
        />
        <Label
          text={nettable.length + ' / 5'}
          className={Styles.abilityCountLabel}
        />
      </Panel>
      <Panel className={Styles.abilitiesContainer}>
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
