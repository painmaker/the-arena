import React, { useEffect, useState } from "react"
import { HUD_THINK_FAST } from "../../../../App"
import { Styles } from "./Styles"
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  unit: EntityIndex,
  buff: BuffID,
}

const Stacks = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifier rendered");

  const { unit, buff, setInterval, clearInterval } = props;

  const [stacks, setStacks] = useState(Buffs.GetStackCount(unit, buff))

  useEffect(() => {
    const update = () => setStacks(Buffs.GetStackCount(unit, buff));
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [unit, buff, setInterval, clearInterval]);

  if (stacks === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.StackLabel()} text={stacks} />
    </Panel>
  );

}

export default React.memo(ReactTimeout(Stacks));