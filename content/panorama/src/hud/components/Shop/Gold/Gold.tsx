import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const Gold = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Gold rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));

  useEffect(() => {
    const update = () => setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval])

  return (
    <Panel className={'shopGoldContainer'}>
      <Panel className={'shopGoldImage'} />
      <Label className={'shopGoldLabel'} text={playerGold} />
    </Panel>
  );

};

export default React.memo(ReactTimeout(Gold));
