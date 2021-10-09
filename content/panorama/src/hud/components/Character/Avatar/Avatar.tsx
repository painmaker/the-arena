import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
interface Props {
  selectedUnit: EntityIndex,
}

const Avatar = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Avatar rendered");

  const { selectedUnit } = props;
  const [steamId, setSteamId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isRealHero = Entities.IsRealHero(selectedUnit);
    const playerId = Entities.GetPlayerOwnerID(selectedUnit);
    const isValidPlayerId = Players.IsValidPlayerID(playerId);
    if (isRealHero && isValidPlayerId) {
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
