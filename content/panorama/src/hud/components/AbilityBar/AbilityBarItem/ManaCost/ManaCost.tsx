import React from "react";
import { Styles } from "./Styles";

type Props = {
  manaCost: number,
}

const ManaCost = (props: Props) => {

  const { manaCost } = props;

  if (manaCost === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={manaCost} />
    </Panel>
  );

};

export default ManaCost;
