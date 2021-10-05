import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex
}

const LevelUpButton = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - LevelUpButton rendered");

  const { ability, selectedUnit } = props;

  const [isAbilityUpgradeable, setIsAbilityUpgradeable] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
      const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
      const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
      const isAbilityUpgradeable = isUpgradeable && isControllable && hasAbilityPoints;
      setIsAbilityUpgradeable(isAbilityUpgradeable);
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, LevelUpButton.name, true);
  }, [ability, selectedUnit])

  if (!isAbilityUpgradeable) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <DOTAScenePanel
        map={'scenes/hud/levelupburst'}
        style={Styles.ParticleScene()}
      />
      <Panel
        onactivate={() => Abilities.AttemptToUpgrade(ability)}
        style={Styles.ButtonBackground()}
      >
        <Panel style={Styles.LockIcon()} />
      </Panel>
    </Panel>
  );

};

export default React.memo(LevelUpButton);
