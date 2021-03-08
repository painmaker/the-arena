import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setSelectedHero } from "../../../../actions/heroSelectionActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { RootState } from "../../../../reducers/rootReducer";
import { HeroSelectionActionTypes, SelectedHero } from "../../../../types/heroSelectionTypes";

const mapStateToProps = (state: RootState) => ({
  selectedHero: state.heroSelectionReducer.hero,
});

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setSelectedHero: (hero: SelectedHero) => dispatch(setSelectedHero(hero)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ReactTimeoutProps & PropsFromRedux & {
  hero: SelectedHero
};

const Hero = (props: Props) => {
  const isSelected = props.selectedHero === props.hero
  return (
    <Panel
      className={"heroSelectionHeroContainer"}
      style={isSelected ? { border: '1px solid rgba(255, 165, 0, 0.5)' } : {}}
    >
      <DOTAHeroImage
        className={'heroSelectionHeroImage'}
        heroname={props.hero.name}
        heroimagestyle="portrait"
        onactivate={() => {
          if (!isSelected) {
            props.setSelectedHero(props.hero);
            Game.EmitSound(props.hero.sounds[Math.floor(Math.random() * props.hero.sounds.length)]);
          }
        }}
      />
    </Panel>
  );
}

export default connector(withReactTimeout(Hero));
