import React from "react";
import CloseBtn from "./CloseBtn/CloseBtn";

const Title = () => {
  return (
    <Panel className={'settingsTitleContainer'}>
      <Label text={"SETTINGS"} className={"settingsTitleLabel"} />
      <CloseBtn />
    </Panel>
  );
};

export default Title;

