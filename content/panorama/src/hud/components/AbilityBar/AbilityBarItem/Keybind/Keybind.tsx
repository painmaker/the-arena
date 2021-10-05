import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const Keybind = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Keybind rendered");

  const { ability, selectedUnit } = props;

  const [keybind, setKeybind] = useState<string | undefined>(undefined);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
      const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
      const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
      const isInLearningMode = Game.IsInAbilityLearnMode();
      const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints;
      const isPassive = Abilities.IsPassive(ability);
      if (isControllable && !isPassive && !isTrainable) {
        setKeybind(Abilities.GetKeybind(ability));
      }
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, Keybind.name);
  }, [ability, selectedUnit]);

  if (!keybind) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={keybind} />
    </Panel>
  );

};

export default React.memo(Keybind);
