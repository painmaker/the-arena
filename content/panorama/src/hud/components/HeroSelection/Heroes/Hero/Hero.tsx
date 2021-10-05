import React, { useState } from "react";
import { useNetTableValues } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../reducers/rootReducer";

const mapStateToProps = (state: RootState) => ({
  focusedHero: state.heroSelectionReducer.focusedHero,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  heroname: string
};

const Hero = (props: Props) => {

  const { heroname, focusedHero } = props;

  const [isHovering, setIsHovering] = useState(false);
  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;

  const isFocused = focusedHero && focusedHero.heroname === heroname;
  const isPicked = Object.values(heroes).find(hero => hero.heroname === heroname)?.picked === 1;
  const steamIds = Object.values(heroes)
    .filter(hero => hero.heroname === heroname)
    .filter(hero => hero.picked === 1)
    .map(hero => Game.GetPlayerInfo(hero.playerID).player_steamid);

  return (
    <Panel className={"heroSelectionHeroContainer"}>
      <Panel
        className={'heroSelectionSelectedHeroBorder'}
        style={{ visibility: isFocused ? 'visible' : 'collapse' }}
      />
      {isPicked && (
        <Image
          className={'heroSelectionSelectedHeroLock'}
          src="s2r://panorama/images/lock_white_png.vtex"
        />
      )}
      {steamIds.length === 1 && (
        <Panel style={{ width: '100%', height: '100%', zIndex: 10 }}>
          <DOTAAvatarImage
            steamid={steamIds[0]}
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',
              verticalAlign: 'top',
              horizontalAlign: 'left',
            }}
          />
        </Panel>
      )}
      <Button
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          if (!isFocused) {
            GameEvents.SendCustomGameEventToServer("on_focus_hero", { heroname: heroname })
          }
        }}
      >
        <DOTAHeroImage
          className={'heroSelectionHeroImage'}
          heroname={heroname}
          heroimagestyle={'portrait'}
          style={{
            transform: (isFocused || isHovering) ? 'scaleX(1.025) scaleY(1.025)' : 'scaleX(1) scaleY(1)',
            washColor: isPicked ? 'rgba(0, 0, 0, 0.925)' : (isFocused || isHovering) ? 'none' : 'rgba(0, 0, 0, 0.15)',
          }}
        />
      </Button>

    </Panel>
  );

}

export default React.memo(connector(Hero));
