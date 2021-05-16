import React from "react";
import { useNetTableValues } from "react-panorama";
import Health from "./Health/Health";
import HeroImage from "./HeroImage/HeroImage";
import Mana from "./Mana/Mana";
import Playername from "./Playername/Playername";

const Heroes = () => {

  const pickedHeroes = Object.values(useNetTableValues('HeroSelectionHeroes').heroes).filter(hero => hero.picked === 1)

  return (
    <Panel className={"heroesContainer"}>
      {pickedHeroes.map((pickedHero) => {
        const entIndex = Players.GetPlayerHeroEntityIndex(pickedHero.playerID);
        return (
          <Panel className="heroContainer" key={entIndex} >
            <HeroImage heroname={pickedHero.heroname} entIndex={entIndex} />
            <Health entIndex={entIndex} />
            <Mana entIndex={entIndex} />
            <Playername playerId={pickedHero.playerID} />
          </Panel>
        );
      })}
    </Panel>
  );

};

export default Heroes;
