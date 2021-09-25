import React from "react";
import CloseBtn from "./CloseBtn/CloseBtn";
import { Styles } from "./Styles";

const Title = () => {

  $.Msg("REACT-RENDER: Settings - Title rendered");

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

