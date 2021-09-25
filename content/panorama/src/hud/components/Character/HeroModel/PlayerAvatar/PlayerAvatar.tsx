import React, { useEffect, useState } from "react";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";

const PlayerAvatar = () => {

  $.Msg("REACT-RENDER: Character - PlayerAvatar rendered");

  const selectedUnit = useSelectedUnit();
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
    <Panel className={'playerContainer'}>
      <DOTAAvatarImage
        steamid={steamId}
        style={{
          width: '64px',
          height: '64px',
          border: '1px solid rgba(0, 0, 0, 0.5)',
          borderRadius: '5px',
        }}
      />
      <Panel className={'playerLabelContainer'}>
        <DOTAUserName className={'playerLabel'} steamid={steamId} />
      </Panel>
    </Panel>
  );

};

export default PlayerAvatar;
