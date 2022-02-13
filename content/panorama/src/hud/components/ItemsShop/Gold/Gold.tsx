import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const Gold = (props: Props) => {

  // $.Msg("REACT-RENDER: ItemsShop - Gold rendered");

  const { selectedUnit } = props;

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
