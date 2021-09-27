import React from "react";
import { useNetTableValues } from "react-panorama";
import Health from "./Health/Health";
import HeroImage from "./HeroImage/HeroImage";
import Mana from "./Mana/Mana";
import Playername from "./Playername/Playername";
import { Styles } from "./Styles";

const Heroes = () => {

  // $.Msg("REACT-RENDER: Heroes rendered");

  const pickedHeroes = Object.values(useNetTableValues('HeroSelectionHeroes').heroes).filter(hero => hero.picked === 1)

  return (
    <Panel style={Styles.HeroesContainer()}>
      {pickedHeroes.map((pickedHero) => {
        const hero = Players.GetPlayerHeroEntityIndex(pickedHero.playerID);
        return (
          <Panel style={Styles.HeroContainer()} key={hero} >
            <HeroImage hero={hero} />
            <Health hero={hero} />
            <Mana hero={hero} />
            <Playername playerId={pickedHero.playerID} />
          </Panel>
        );
      })}
    </Panel>
  );

};

export default Heroes;
