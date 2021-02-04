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
    const color = Players.GetPlayerColor(props.playerId);
    const name = Players.GetPlayerName(props.playerId);
    return (
        <Panel hittest={false} style={{ width: '100%'}}>
            <Label
                className="heroesPlayernameLabel"
                text={name}
                style={{ color: playerColorToARGB(color) }}
            />
        </Panel>
    );
};

export default Playername;
