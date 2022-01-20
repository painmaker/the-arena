import React from "react";
import AbilitiesShopButton from "./AbilitiesShopButton/AbilitiesShopButton";
import CharaterDetailsButton from "./CharacterDetailsButton/CharaterDetailsButton";
import SettingsButton from "./SettingsButton/SettingsButton";
import ItemsShopButton from "./ItemsShopButton/ItemsShopButton";
import Styles from "./styles.module.css";

const ButtonGroup = () => {

  // $.Msg("REACT-RENDER: ButtonGroup rendered");

  return (
    <Panel hittest={false} className={Styles.container}>
      <SettingsButton />
      <ItemsShopButton />
      <CharaterDetailsButton />
      <AbilitiesShopButton />
    </Panel >
  );

};

export default React.memo(ButtonGroup);
