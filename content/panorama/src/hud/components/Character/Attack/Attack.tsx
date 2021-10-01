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

  // $.Msg("REACT-RENDER: Character - Attack rendered");

  const { selectedUnit } = props;

  return (
    <Panel style={Styles.OuterContainer()}>
      <Label text={'ATTACK'} style={Styles.Title()} />
      <Divider />
      <Panel style={Styles.InnerContainer()}>
        <Panel style={Styles.Row()}>
          <Panel style={Styles.LeftColumn()}>
            <Label text={'Attack Speed:'} style={Styles.ColumnLabel()} />
          </Panel>
          <Panel style={Styles.RightColumn()}>
            <AttackSpeed selectedUnit={selectedUnit} />
          </Panel>
        </Panel>
        <Panel style={Styles.Row()}>
          <Panel style={Styles.LeftColumn()}>
            <Label text={'Damage:'} style={Styles.ColumnLabel()} />
          </Panel>
          <Panel style={Styles.RightColumn()}>
            <Damage selectedUnit={selectedUnit} />
          </Panel>
        </Panel>
        <Panel style={Styles.Row()}>
          <Panel style={Styles.LeftColumn()}>
            <Label text={'Attack Range:'} style={Styles.ColumnLabel()} />
          </Panel>
          <Panel style={Styles.RightColumn()}>
            <AttackRange selectedUnit={selectedUnit} />
          </Panel>
        </Panel>
        <Panel style={Styles.Row()}>
          <Panel style={Styles.LeftColumn()}>
            <Label text={'Movement Speed:'} style={Styles.ColumnLabel()} />
          </Panel>
          <Panel style={Styles.RightColumn()}>
            <MoveSpeed selectedUnit={selectedUnit} />
          </Panel>
        </Panel>
        <Panel style={Styles.Row()}>
          <Panel style={Styles.LeftColumn()}>
            <Label text={'Spell Amplification:'} style={Styles.ColumnLabel()} />
          </Panel>
          <Panel style={Styles.RightColumn()}>
            <SpellAmplification selectedUnit={selectedUnit} />
          </Panel>
        </Panel>
        <Panel style={Styles.Row()}>
          <Panel style={Styles.LeftColumn()}>
            <Label text={'Mana Regeneration:'} style={Styles.ColumnLabel()} />
          </Panel>
          <Panel style={Styles.RightColumn()}>
            <ManaRegen selectedUnit={selectedUnit} />
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  );

};

export default Attack;
