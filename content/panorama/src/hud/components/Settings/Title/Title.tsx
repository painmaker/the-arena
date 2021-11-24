import React from "react";
import CloseBtn from "./CloseBtn/CloseBtn";
import Styles from "./styles.module.css";

const Title = () => {

  // $.Msg("REACT-RENDER: Settings - Title rendered");

  return (
    <Panel className={Styles.container}>
      <Label
        text={"SETTINGS"}
        className={Styles.label}
      />
      <CloseBtn />
    </Panel>
  );

};

export default React.memo(Title);

