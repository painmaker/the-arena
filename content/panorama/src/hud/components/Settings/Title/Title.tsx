import React from "react";
import CloseBtn from "./CloseBtn/CloseBtn";
import { Styles } from "./Styles";

const Title = () => {
  return (
    <Panel style={Styles.Container()}>
      <Label
        text={"SETTINGS"}
        style={Styles.Label()}
      />
      <CloseBtn />
    </Panel>
  );
};

export default Title;

