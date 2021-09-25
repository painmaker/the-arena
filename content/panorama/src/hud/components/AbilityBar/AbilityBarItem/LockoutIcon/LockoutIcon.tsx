import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
}

const LockoutIcon = (props: Props) => {

  const { selectedUnit, setInterval, clearInterval } = props;

  const [isStunned, setIsStunned] = useState(Entities.IsStunned(selectedUnit));
  const [isSilenced, setIsSilenced] = useState(Entities.IsSilenced(selectedUnit));
  const [isCommandRestricted, setIsCommandRestricted] = useState(Entities.IsCommandRestricted(selectedUnit));
  const [isNightmared, setIsNightmared] = useState(Entities.IsNightmared(selectedUnit));
  const [isHexed, setIsHexed] = useState(Entities.IsHexed(selectedUnit));

  useEffect(() => {

    const update = () => {
      setIsStunned(Entities.IsStunned(selectedUnit));
      setIsSilenced(Entities.IsSilenced(selectedUnit));
      setIsCommandRestricted(Entities.IsCommandRestricted(selectedUnit));
      setIsNightmared(Entities.IsNightmared(selectedUnit));
      setIsHexed(Entities.IsHexed(selectedUnit));
    };

    update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [selectedUnit, setInterval, clearInterval]);

  const showLock = (isStunned || isSilenced || isCommandRestricted || isNightmared || isHexed);

  return (
    <Panel style={Styles.Container(showLock)}>
      {showLock && (
        <Panel style={Styles.Icon()} />
      )}
    </Panel>
  );

};

export default withReactTimeout(LockoutIcon);
