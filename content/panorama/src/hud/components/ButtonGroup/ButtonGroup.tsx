import React from "react";
import CharaterPanelButton from "./CharacterPanelButton/CharaterPanelButton";
import SettingsButton from "./SettingsButton/SettingsButton";
import ShoppingButton from "./ShoppingButton/ShoppingButton";

const ButtonGroup = () => {
  return (
    <Panel hittest={false} className={"buttonGroupContainer"}>
      <Panel hittest={false} className="buttonGroupEntry">
        <SettingsButton />
      </Panel>
      <Panel hittest={false} className="buttonGroupEntry">
        <ShoppingButton />
      </Panel>
      <Panel hittest={false} className="buttonGroupEntry">
        <CharaterPanelButton />
      </Panel>
    </Panel>
  );
};

export default ButtonGroup;
