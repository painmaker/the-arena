import React from "react";
import { Styles } from "./Styles";

interface Props {
  playerId: PlayerID;
}

const Playername = (props: Props) => {
  return (
    <Panel hittest={false} style={{ width: '100%' }}>
      <Label
        text={Players.GetPlayerName(props.playerId)}
        style={Styles.Container(props.playerId)}
      />
    </Panel>
  );
};

export default Playername;
