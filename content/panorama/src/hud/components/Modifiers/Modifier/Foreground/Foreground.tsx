import React from "react";
import Stacks from "./Stacks/Stacks";
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  panelId: string,
}

const Foreground = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit, panelId } = props;

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
            key={panelId}
            className={Styles.image}
            abilityname={Abilities.GetAbilityName(ability)}
          />
        )}
        {isItem && (
          <DOTAItemImage
            key={panelId}
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
