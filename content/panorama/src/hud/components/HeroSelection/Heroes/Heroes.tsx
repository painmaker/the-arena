import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import Hero from "./Hero/Hero";
import { setRandomHeroDialogVisible } from "../../../actions/heroSelectionActions";
import Styles from './styles.module.css';

const selectableHeronames = [
  'npc_dota_hero_dragon_knight',
  'npc_dota_hero_windrunner',
  'npc_dota_hero_phantom_assassin',
  'npc_dota_hero_crystal_maiden',
  'npc_dota_hero_dazzle',
  'npc_dota_hero_lina',
];

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setRandomHeroDialogVisible: (visible: boolean) => dispatch(setRandomHeroDialogVisible(visible)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Heroes = (props: Props) => {
  return (
    <Panel className={Styles.outerContainer}>
      <Label className={Styles.label} text={'Heroes'} />
      <Panel className={Styles.innerContainer}>
        {selectableHeronames.map(heroname => (
          <Hero
            key={heroname}
            heroname={heroname}
          />
        ))}
        <Button
          className={Styles.btnContainer}
          onactivate={() => {
            Game.EmitSound("ui_topmenu_select");
            props.setRandomHeroDialogVisible(true);
          }}
        >
          <Image className={Styles.btnImage} />
        </Button>
      </Panel>
    </Panel>
  );
}

export default connector(Heroes);
