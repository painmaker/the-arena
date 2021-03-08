import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {

};

const Gold = (props: Props) => {

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(Players.GetLocalPlayerPortraitUnit())));

  useEffect(() => {
    const id = props.setInterval(() => {
      setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(Players.GetLocalPlayerPortraitUnit())))
    }, 100);
    return () => props.clearInterval(id);
  }, [])

  return (
    <Panel className={'shopGoldContainer'}>
      <Panel className={'shopGoldImage'} />
      <Label className={'shopGoldLabel'} text={playerGold} />
    </Panel>
  );

};

export default withReactTimeout(Gold);
