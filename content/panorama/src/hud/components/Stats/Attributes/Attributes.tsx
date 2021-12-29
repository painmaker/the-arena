import React, { useState } from "react";
import { Context, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Attribute from "./Attribute/Attribute";
import Styles from './styles.module.css';

const attributes = {
  DOTA_ATTRIBUTE_STRENGTH: 0,
  DOTA_ATTRIBUTE_AGILITY: 1,
  DOTA_ATTRIBUTE_INTELLECT: 2,
}

const Attributes = () => {

  // $.Msg("REACT-RENDER: Stats - Damage rendered");

  const { selectedUnit } = React.useContext(Context);

  const [strengthBase, setStrengthBase] = useState(0);
  const [strengthBonus, setStrengthBonus] = useState(0);

  const [agilityBase, setAgilityBase] = useState(0);
  const [agilityBonus, setAgilityBonus] = useState(0);

  const [intellectBase, setIntellectBase] = useState(0);
  const [intellectBonus, setIntellectBonus] = useState(0);

  const [primaryAttribute, setPrimaryAttribute] = useState<number | undefined>(undefined);

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
        if (name === 'modifier_ui_primary_attribute') {
          setPrimaryAttribute(Buffs.GetStackCount(selectedUnit, buff));
        }
      }
    }
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={Styles.container}>
      <Panel className={Styles.row}> 
        <Attribute 
          imgName={'primary_attribute_icon_strength'} 
          primaryAttribute={primaryAttribute === 0} 
          base={strengthBase}
          bonus={strengthBonus}          
        />
      </Panel>
      <Panel className={Styles.row}> 
        <Attribute 
          imgName={'primary_attribute_icon_agility'} 
          primaryAttribute={primaryAttribute === 1} 
          base={agilityBase}
          bonus={agilityBonus}          
        />
      </Panel>
      <Panel className={Styles.row}> 
        <Attribute 
          imgName={'primary_attribute_icon_intelligence'} 
          primaryAttribute={primaryAttribute === 2} 
          base={intellectBase}
          bonus={intellectBonus}          
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(Attributes);
