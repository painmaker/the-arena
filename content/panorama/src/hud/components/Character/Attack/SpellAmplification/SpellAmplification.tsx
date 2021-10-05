import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const SpellAmplification = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - SpellAmplification rendered");

  const { selectedUnit } = props;

  const [spellAmp, setSpellAmp] = useState(Entities.GetAttackRange(selectedUnit))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(selectedUnit, i);
        const name = Buffs.GetName(selectedUnit, buff);
        if (name === 'modifier_ui_spell_amp') {
          setSpellAmp(Buffs.GetStackCount(selectedUnit, buff) / 100);
        }
      }
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Spell Amplification:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={spellAmp + ' %'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(SpellAmplification);
