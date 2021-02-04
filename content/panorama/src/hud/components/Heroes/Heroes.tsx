import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import Health from "./Health/Health";
import HeroImage from "./HeroImage/HeroImage";
import Mana from "./Mana/Mana";
import Playername from "./Playername/Playername";

const Heroes = () => {

  const [playerIds, setPlayerIds] = useState<Set<PlayerID>>(new Set([0, 1, 2, 3]));

  useGameEvent("create_hero_image_for_player", (event: any) => {
    setPlayerIds(prevPlayerIds => new Set([...prevPlayerIds, event.playerId]));
  }, []);

  return (
    <Panel hittest={false} className={"heroesContainer"}>
      {Array.from(playerIds).map((playerId) => {
        const entIndex = Players.GetPlayerHeroEntityIndex(playerId);
        if (entIndex === -1) {
          return null;
        }
        return (
          <Panel
            hittest={false}
            className="heroContainer"
            key={entIndex}
          >
            <HeroImage playerId={playerId} entIndex={entIndex} />
            <Health entIndex={entIndex} />
            <Mana entIndex={entIndex} />
            <Playername playerId={playerId} />
          </Panel>
        );
      })}
    </Panel>
  );

};

export default Heroes;
