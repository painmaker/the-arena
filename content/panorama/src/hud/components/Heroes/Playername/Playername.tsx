import React from "react";

interface Props {
  playerId: PlayerID;
}

const playerColorToARGB = (i: number) =>
  "#" +
  ("00" + (i & 0xff).toString(16)).substr(-2) +
  ("00" + ((i >> 8) & 0xff).toString(16)).substr(-2) +
  ("00" + ((i >> 16) & 0xff).toString(16)).substr(-2) +
  ("00" + ((i >> 24) & 0xff).toString(16)).substr(-2);

const Playername = (props: Props) => {
  return (
    <Panel hittest={false} style={{ width: '100%' }}>
      <Label
        className="heroesPlayernameLabel"
        text={Players.GetPlayerName(props.playerId)}
        style={{ color: playerColorToARGB(Players.GetPlayerColor(props.playerId)) }}
      />
    </Panel>
  );
};

export default Playername;
