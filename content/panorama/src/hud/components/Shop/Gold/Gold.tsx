import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const Gold = (props: Props) => {

  $.Msg("REACT-RENDER: Shop - Gold rendered");

  const { selectedUnit } = props;

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));

  useEffect(() => {

    const update = () => {
      setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
    };

    // update();
    const id = props.setInterval(update, 100);

    return () => props.clearInterval(id);

  }, [selectedUnit])

  return (
    <Panel className={'shopGoldContainer'}>
      <Panel className={'shopGoldImage'} />
      <Label className={'shopGoldLabel'} text={playerGold} />
    </Panel>
  );

};

export default withReactTimeout(Gold);
