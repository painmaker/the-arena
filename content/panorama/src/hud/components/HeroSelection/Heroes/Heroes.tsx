import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import Hero from "./Hero/Hero";
import { resetFocusedHero } from "../../../actions/heroSelectionActions";

const selectableHeronames = [
  'npc_dota_hero_dragon_knight',
  'npc_dota_hero_windrunner',
  'npc_dota_hero_phantom_assassin',
  'npc_dota_hero_crystal_maiden',
  'npc_dota_hero_dazzle',
  'npc_dota_hero_lina',
];

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Heroes = (props: Props) => {
  return (
    <Panel className={"heroSelectionHeroesContainer"} >
      { selectableHeronames.map(heroname => (
        <Hero
          key={heroname}
          heroname={heroname}
        />
      ))}
      <Button
        className={'heroSelectionHeroesRandomBtnContainer'}
        onactivate={() => {
          props.resetFocusedHero();
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image className={'heroSelectionHeroesRandomBtnImage'} />
      </Button>
    </Panel>
  );
}

export default connector(Heroes);
