import React, { useState } from "react";
import { useNetTableValues } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { RootState } from "../../../../reducers/rootReducer";

const mapStateToProps = (state: RootState) => ({
  focusedHero: state.heroSelectionReducer.focusedHero,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ReactTimeoutProps & PropsFromRedux & {
  heroname: string
};

const Hero = (props: Props) => {

  const [isHovering, setIsHovering] = useState(false);
  const selectedHeroes = useNetTableValues('SelectedHero');

  const isFocused = props.focusedHero && props.focusedHero.heroname === props.heroname;
  const isSelected = Object.values(selectedHeroes).some(hero => hero.heroname === props.heroname);

  return (
    <Panel className={"heroSelectionHeroContainer"}>
      <Panel
        className={'heroSelectionSelectedHeroBorder'}
        style={{ visibility: isFocused ? 'visible' : 'collapse' }}
      />
      <DOTAHeroImage
        className={'heroSelectionHeroImage'}
        heroname={props.heroname}
        heroimagestyle={'portrait'}
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          if (!isFocused) {
            GameEvents.SendCustomGameEventToServer("on_focus_hero", { heroname: props.heroname })
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
