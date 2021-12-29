import React, { useState } from "react";
import { Context, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
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

  $.Msg("primaryAttribute: " + primaryAttribute);

  return (
    <Panel className={Styles.container}>
      <Panel className={Styles.row}> 
        <Image 
          src={'file://{images}/primary_attribute_icon_strength.png'}
          className={Styles.image} 
          style={{
            border: primaryAttribute === 0 ? '1px solid rgba(255, 165, 0, 0.75)' : '1px solid black'
          }}
        />
        <Label 
          className={Styles.label}
          text={strengthBase} 
        />
        <Label 
          className={Styles.label}
          text={' + ' + strengthBonus} 
          style={{ color: strengthBonus > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
        />
      </Panel>
      <Panel className={Styles.row}> 
        <Image 
          src={'file://{images}/primary_attribute_icon_agility.png'}
          className={Styles.image} 
          style={{
            border: primaryAttribute === 1 ? '1px solid rgba(255, 165, 0, 0.75)' : '1px solid black'
          }}
        />
        <Label 
          className={Styles.label}
          text={agilityBase} 
        />
        <Label 
          className={Styles.label}
          text={' + ' + agilityBonus} 
          style={{ color: agilityBonus > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
        />
      </Panel>
      <Panel className={Styles.row}> 
        <Image 
          src={'file://{images}/primary_attribute_icon_intelligence.png'}
          className={Styles.image} 
          style={{
            border: primaryAttribute === 2 ? '1px solid rgba(255, 165, 0, 0.75)' : '1px solid black'
          }}
        />
        <Label 
          className={Styles.label}
          text={intellectBase} 
        />
        <Label 
          className={Styles.label}
          text={' + ' + intellectBonus} 
          style={{ color: intellectBonus > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(Attributes);
