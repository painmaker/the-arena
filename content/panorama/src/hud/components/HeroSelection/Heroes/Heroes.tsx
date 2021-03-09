import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import Hero from "./Hero/Hero";
import { selectableHeroes } from "../../../data/heroes";
import { resetFocusedHero } from "../../../actions/heroSelectionActions";

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetSelectedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Heroes = (props: Props) => {
  return (
    <Panel className={"heroSelectionHeroesContainer"} >
      { selectableHeroes.map(hero => (
        <Hero
          key={hero.name}
          hero={hero}
        />
      ))}
      <Button
        className={'heroSelectionHeroesRandomBtnContainer'}
        onactivate={() => {
          props.resetSelectedHero();
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image className={'heroSelectionHeroesRandomBtnImage'} />
      </Button>
    </Panel>
  );
}

export default connector(Heroes);
