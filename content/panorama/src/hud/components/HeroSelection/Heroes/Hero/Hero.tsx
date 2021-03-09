import React, { useState } from "react";
import { useNetTableValues } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setFocusedHero } from "../../../../actions/heroSelectionActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { RootState } from "../../../../reducers/rootReducer";
import { HeroSelectionActionTypes, FocusedHero } from "../../../../types/heroSelectionTypes";

const mapStateToProps = (state: RootState) => ({
  focusedHero: state.heroSelectionReducer.hero,
});

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setSelectedHero: (hero: FocusedHero) => dispatch(setFocusedHero(hero)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ReactTimeoutProps & PropsFromRedux & {
  hero: FocusedHero
};

const Hero = (props: Props) => {

  const [isHovering, setIsHovering] = useState(false);
  const selectedHeroes = useNetTableValues('SelectedHero');

  const isFocused = props.focusedHero === props.hero;
  const isSelected = Object.values(selectedHeroes).some(hero => hero.heroname === props.hero.name);

  return (
    <Panel className={"heroSelectionHeroContainer"}>
      <Panel
        className={'heroSelectionSelectedHeroBorder'}
        style={{ visibility: isFocused ? 'visible' : 'collapse' }}
      />
      <DOTAHeroImage
        className={'heroSelectionHeroImage'}
        heroname={props.hero.name}
        heroimagestyle={'portrait'}
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          if (!isFocused) {
            props.setSelectedHero(props.hero);
            Game.EmitSound(props.hero.sounds[Math.floor(Math.random() * props.hero.sounds.length)]);
          }
        }}
        style={{
          transform: (isFocused || isHovering) ? 'scaleX(1.025) scaleY(1.025)' : 'scaleX(1) scaleY(1)',
          washColor: isSelected ? 'rgba(0, 0, 0, 0.975)' : (isFocused || isHovering) ? 'none' : 'rgba(0, 0, 0, 0.15)',
        }}
      />
    </Panel>
  );

}

export default connector(withReactTimeout(Hero));
