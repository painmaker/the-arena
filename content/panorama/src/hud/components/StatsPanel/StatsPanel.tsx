import React from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";

const StatsPanel = () => {
  return (
    <Panel hittest={false} className={"statsPanelContainer"}>
      <Level />
      <Armor />
      <MagicResistance />
      <Damage />
      <MoveSpeed />
    </Panel>
  );
};

export default StatsPanel;
