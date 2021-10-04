import React from "react";
import Damage from "./Damage/Damage";
import AttackSpeed from "./AttackSpeed/AttackSpeed";
import AttackRange from "./AttackRange/AttackRange";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import ManaRegen from "./ManaRegen/ManaRegen";
import SpellAmplification from "./SpellAmplification/SpellAmplification";
import Divider from "../Divider/Divider";
import { Styles } from "./Styles";

interface Props {
  selectedUnit: EntityIndex,
}

const Attack = (props: Props) => {

  $.Msg("REACT-RENDER: Character - Attack rendered");

  const { selectedUnit } = props;

  return (
    <Panel style={Styles.OuterContainer()}>
      <Label text={'ATTACK'} style={Styles.Title()} />
      <Divider />
      <Panel style={Styles.InnerContainer()}>
        <AttackSpeed selectedUnit={selectedUnit} />
        <Damage selectedUnit={selectedUnit} />
        <AttackRange selectedUnit={selectedUnit} />
        <MoveSpeed selectedUnit={selectedUnit} />
        <SpellAmplification selectedUnit={selectedUnit} />
        <ManaRegen selectedUnit={selectedUnit} />
      </Panel>
    </Panel>
  );

};

export default React.memo(Attack);
