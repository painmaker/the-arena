import React from "react";
import { useNetTableValues } from "react-panorama";
import Health from "./Health/Health";
import Image from "./Image/Image";
import Mana from "./Mana/Mana";
import Playername from "./Playername/Playername";
import Styles from "./styles.module.css";

const Heroes = () => {

  // $.Msg("REACT-RENDER: Heroes rendered");

  const pickedHeroes = Object.values(useNetTableValues('HeroSelectionHeroes').heroes).filter(hero => hero.picked === 1)

  return (
    <Panel className={Styles.heroesContainer}>
      {pickedHeroes.map((pickedHero) => {
        const hero = Players.GetPlayerHeroEntityIndex(pickedHero.playerID);
        return (
          <Panel className={Styles.heroContainer} key={hero} >
            <Image hero={hero} />
            <Health hero={hero} />
            <Mana hero={hero} />
            <Playername playerId={pickedHero.playerID} />
          </Panel>
        );
      })}
    </Panel>
  );

};

export default React.memo(Heroes);
