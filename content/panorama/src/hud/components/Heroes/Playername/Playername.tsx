import React from "react";
import { toColor } from "../../../utils/Color";

interface Props {
  playerId: PlayerID;
}

const Playername = (props: Props) => {
  return (
    <Panel hittest={false} style={{ width: '100%' }}>
      <Label
        className="heroesPlayernameLabel"
        text={Players.GetPlayerName(props.playerId)}
        style={{ color: toColor(props.playerId) }}
      />
    </Panel>
  );
};

export default Playername;
