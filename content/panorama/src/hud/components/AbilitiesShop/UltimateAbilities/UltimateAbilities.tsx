import React from "react";
import { useNetTableValues } from "react-panorama";
import AbilityImage from "../AbilityImage/AbilityImage";
import Styles from './styles.module.css';

type Props = {
  selectedUnit: EntityIndex
  ultimateAbilities: ShopAbility[],
  searchValue: string,
}

const UltimateAbilities = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - UltimateAbilities rendered");


  const { selectedUnit, ultimateAbilities, searchValue } = props;

  const playerOwnerID = Entities.GetPlayerOwnerID(selectedUnit);
  const nettable = playerOwnerID !== -1 ? Object.values(useNetTableValues('UltimateAbilities')[playerOwnerID]) : [];

  return (
    <Panel className={Styles.container}>
      <Panel className={Styles.titleContainer}>
        <Label
          text={'Ultimate Abilities'}
          className={Styles.title}
        />
        <Label
          text={nettable.length + ' / 1'}
          className={Styles.abilityCountLabel}
        />
      </Panel>
      <Panel className={Styles.abilitiesContainer}>
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
