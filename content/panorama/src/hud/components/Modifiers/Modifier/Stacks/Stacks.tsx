import React, { useEffect, useState } from "react"
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout"
import { Styles } from "./Styles"

type Props = ReactTimeoutProps & {
  unit: EntityIndex,
  buff: BuffID,
}

const Stacks = (props: Props) => {

  const [stacks, setStacks] = useState(Buffs.GetStackCount(props.unit, props.buff))

  useEffect(() => {
    const id = props.setInterval(() => {
      setStacks(Buffs.GetStackCount(props.unit, props.buff))
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  if (stacks === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.StackLabel()} text={stacks} />
    </Panel>
  );

}

export default withReactTimeout(Stacks);