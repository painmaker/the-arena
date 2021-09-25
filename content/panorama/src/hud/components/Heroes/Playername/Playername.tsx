import React from "react";
import { Styles } from "./Styles";

interface Props {
  playerId: PlayerID;
}

const Playername = (props: Props) => {

  const { playerId } = props;

  return (
    <Panel hittest={false} style={{ width: '100%' }}>
      <Label
        text={Players.GetPlayerName(playerId)}
        style={Styles.Label(playerId)}
      />
    </Panel>
  );

};

export default Playername;
