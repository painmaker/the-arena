import React, { useState } from "react";
import { SelectedUnitContext, HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';


const Gold = () => {

  // $.Msg("REACT-RENDER: ItemsShop - Gold rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));

  useInterval(() => {
    setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)))
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}>
      <Panel className={Styles.image} />
      <Label className={Styles.label} text={playerGold} />
    </Panel>
  );

};

export default React.memo(Gold);
