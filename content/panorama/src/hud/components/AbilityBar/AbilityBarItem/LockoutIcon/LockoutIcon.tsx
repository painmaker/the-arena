import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex,
  unitEntityIndex: EntityIndex,
}

const LockoutIcon = (props: Props) => {

  const [isStunned, setIsStunned] = useState(Entities.IsStunned(props.unitEntityIndex));
  const [isSilenced, setIsSilenced] = useState(Entities.IsSilenced(props.unitEntityIndex));
  const [isCommandRestricted, setIsCommandRestricted] = useState(Entities.IsCommandRestricted(props.unitEntityIndex));
  const [isNightmared, setIsNightmared] = useState(Entities.IsNightmared(props.unitEntityIndex));
  const [isHexed, setIsHexed] = useState(Entities.IsHexed(props.unitEntityIndex));

  useEffect(() => {
    const id = props.setInterval(() => {
      setIsStunned(Entities.IsStunned(props.unitEntityIndex));
      setIsSilenced(Entities.IsSilenced(props.unitEntityIndex));
      setIsCommandRestricted(Entities.IsCommandRestricted(props.unitEntityIndex));
      setIsNightmared(Entities.IsNightmared(props.unitEntityIndex));
      setIsHexed(Entities.IsHexed(props.unitEntityIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

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
