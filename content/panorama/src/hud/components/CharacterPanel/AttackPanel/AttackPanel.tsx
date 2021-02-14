import React from "react";
import Damage from "./Damage/Damage";
import AttackSpeed from "./AttackSpeed/AttackSpeed";
import AttackRange from "./AttackRange/AttackRange";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import ManaRegen from "./ManaRegen/ManaRegen";
import SpellAmplification from "./SpellAmplification/SpellAmplification";
import Divider from "../Divider/Divider";

const AttackPanel = () => {
  return (
    <Panel hittest={false} className={'attackPanelContainer'}>
      <Panel className={'attackPanelBackground'}>
        <Label text={'ATTACK'} className={'characterPanelComponentTitleLabel attackPanelTitle'} />
        <Divider />
        <Panel className={'attackPanelLabelContainer'}>
          <AttackSpeed />
          <Damage />
          <AttackRange />
          <MoveSpeed />
          <SpellAmplification />
          <ManaRegen />
        </Panel>
      </Panel>
    </Panel>
  );
};

export default AttackPanel;
