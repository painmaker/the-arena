import React, { useEffect, useState } from "react";
import { SelectedUnitContext } from "../../../App";
import { Styles } from "./Styles";

const Avatar = () => {

  // $.Msg("REACT-RENDER: Character - Avatar rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [steamId, setSteamId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isHero = Entities.IsHero(selectedUnit);
    const playerId = Entities.GetPlayerOwnerID(selectedUnit);
    const isValidPlayerId = Players.IsValidPlayerID(playerId);
    if (isHero && isValidPlayerId) {
      setSteamId(Game.GetPlayerInfo(playerId).player_steamid);
    } else {
      setSteamId(undefined);
    }
  }, [selectedUnit])

  if (steamId === undefined) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <DOTAAvatarImage steamid={steamId} style={Styles.Image()} />
      <Panel style={Styles.LabelContainer()}>
        <DOTAUserName steamid={steamId} style={Styles.Label()} />
      </Panel>
    </Panel>
  );

};

export default React.memo(Avatar);
