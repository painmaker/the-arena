import React from "react";
import Stacks from "./Stacks/Stacks";
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
}

const Foreground = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit } = props;

  const ability = Buffs.GetAbility(selectedUnit, buff);
  const isItem = Abilities.IsItem(ability);

  return (
    <React.Fragment>
      <Panel className={Styles.container}>
        <Stacks
          unit={selectedUnit}
          buff={buff}
        />
        {!isItem && (
          <DOTAAbilityImage
            className={Styles.image}
            abilityname={Abilities.GetAbilityName(ability)}
          />
        )}
        {isItem && (
          <DOTAItemImage
            className={Styles.paddedImage}
            itemname={Buffs.GetTexture(selectedUnit, buff)}
            showtooltip={false}
          />
        )}
      </Panel>
    </React.Fragment>
  );

};

export default React.memo(Foreground);
