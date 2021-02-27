import React, { useState } from "react";
import { useGameEvent } from "react-panorama";

const PlayerAvatar = () => {

  const [entindex, setEntindex] = useState(Players.GetLocalPlayerPortraitUnit());

  useGameEvent("dota_player_update_query_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  if (!Entities.IsRealHero(entindex)) {
    return null;
  }

  const playerId = Entities.GetPlayerOwnerID(entindex);
  if (!Players.IsValidPlayerID(playerId)) {
    return null;
  }

  const steamid = Game.GetPlayerInfo(playerId).player_steamid;

  return (
    <Panel className={'playerContainer'}>
      <DOTAAvatarImage
        steamid={steamid}
        style={{
          width: '64px',
          height: '64px',
          border: '1px solid rgba(0, 0, 0, 0.5)',
          borderRadius: '5px',
        }}
      />
      <Panel className={'playerLabelContainer'}>
        <DOTAUserName className={'playerLabel'} steamid={steamid} />
      </Panel>
    </Panel>
  );

};

export default PlayerAvatar;
