import React from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import { Styles } from "./Styles";

const Stats = () => {

  $.Msg("REACT-RENDER: Stats rendered");

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <Level />
      <Armor />
      <MagicResistance />
      <Damage />
      <MoveSpeed />
    </Panel>
  );

};

export default Stats;
