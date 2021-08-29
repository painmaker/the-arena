import React from "react";
import { Styles } from "./Styles";

type Props = {
  abilityEntityIndex: AbilityEntityIndex,
  manaCost: number,
}

const ManaCost = (props: Props) => {
  if (props.manaCost === 0) {
    return null;
  }
  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={props.manaCost} />
    </Panel>
  );
};

export default ManaCost;
