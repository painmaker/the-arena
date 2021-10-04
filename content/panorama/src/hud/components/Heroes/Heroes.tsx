import React from "react";
import { useNetTableValues } from "react-panorama";
import Health from "./Health/Health";
import Image from "./Image/Image";
import Mana from "./Mana/Mana";
import Playername from "./Playername/Playername";
import { Styles } from "./Styles";

type Props = {
  // ownProps
};

const Heroes = (props: Props) => {

  $.Msg("REACT-RENDER: Heroes rendered");

  const pickedHeroes = Object.values(useNetTableValues('HeroSelectionHeroes').heroes).filter(hero => hero.picked === 1)

  return (
    <Panel style={Styles.HeroesContainer()}>
      {pickedHeroes.map((pickedHero) => {
        const hero = Players.GetPlayerHeroEntityIndex(pickedHero.playerID);
        return (
          <Panel style={Styles.HeroContainer()} key={hero} >
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
