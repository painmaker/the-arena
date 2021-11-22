import React from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import styles from "./stats.module.css"

type Props = {
  selectedUnit: EntityIndex,
};

const Stats = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={styles.container}>
      <Level selectedUnit={selectedUnit} />
      <Armor selectedUnit={selectedUnit} />
      <MagicResistance selectedUnit={selectedUnit} />
      <Damage selectedUnit={selectedUnit} />
      <MoveSpeed selectedUnit={selectedUnit} />
    </Panel>
  );

};

export default React.memo(Stats);
