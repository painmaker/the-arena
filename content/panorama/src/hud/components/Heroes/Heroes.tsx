import React from "react";
import { useNetTableValues } from "react-panorama";
import Health from "./Health/Health";
import HeroImage from "./HeroImage/HeroImage";
import Mana from "./Mana/Mana";
import Playername from "./Playername/Playername";

const Heroes = () => {

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const playerIDs = Object.values(heroes).filter(hero => hero.picked === 1).map(hero => hero.playerID);

  return (
    <Panel className={"heroesContainer"}>
      {playerIDs.map((playerId) => {
        const entIndex = Players.GetPlayerHeroEntityIndex(playerId);
        if (entIndex === -1) {
          return null;
        }
        return (
          <Panel className="heroContainer" key={entIndex} >
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
