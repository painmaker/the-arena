import React, { useState } from "react";
import { Context, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';


const Attributes = () => {

  // $.Msg("REACT-RENDER: Stats - Damage rendered");

  const { selectedUnit } = React.useContext(Context);

  const [strengthBase, setStrengthBase] = useState(0);
  const [strengthBonus, setStrengthBonus] = useState(0);

  const [agilityBase, setAgilityBase] = useState(0);
  const [agilityBonus, setAgilityBonus] = useState(0);

  const [intellectBase, setIntellectBase] = useState(0);
  const [intellectBonus, setIntellectBonus] = useState(0);

  useInterval(() => {
    if (Entities.IsHero(selectedUnit)) {
      const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(selectedUnit, i);
        const name = Buffs.GetName(selectedUnit, buff);
        if (name === 'modifier_ui_attribute_strength_base') {
          setStrengthBase(Buffs.GetStackCount(selectedUnit, buff));
        }
        if (name === 'modifier_ui_attribute_strength_bonus') {
          setStrengthBonus(Buffs.GetStackCount(selectedUnit, buff));
        }
        if (name === 'modifier_ui_attribute_agility_base') {
          setAgilityBase(Buffs.GetStackCount(selectedUnit, buff));
        }
        if (name === 'modifier_ui_attribute_agility_bonus') {
          setAgilityBonus(Buffs.GetStackCount(selectedUnit, buff));
        }
        if (name === 'modifier_ui_attribute_intellect_base') {
          setIntellectBase(Buffs.GetStackCount(selectedUnit, buff));
        }
        if (name === 'modifier_ui_attribute_intellect_bonus') {
          setIntellectBonus(Buffs.GetStackCount(selectedUnit, buff));
        }
      }
    }
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={Styles.container}>
      <Label 
        className={Styles.label}
        text={strengthBase + ' + ' + strengthBonus} 
      />
      <Label 
        className={Styles.label}
        text={agilityBase + ' + ' + agilityBonus} 
      />
      <Label 
        className={Styles.label}
        text={intellectBase + ' + ' + intellectBonus} 
      />
    </Panel>
  );

};

export default React.memo(Attributes);
