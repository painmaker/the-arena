import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const Keybind = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - Keybind rendered");

  const { ability, selectedUnit, setInterval, clearInterval } = props;

  const [keybind, setKeybind] = useState<string | undefined>(undefined);

  useEffect(() => {

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
    };

    update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [ability, selectedUnit, setInterval, clearInterval]);

  if (!keybind) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={keybind} />
    </Panel>
  );

};

export default withReactTimeout(Keybind);
