import React, { Dispatch, useEffect } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { setHeroSelectionVisible } from "../../actions/heroSelectionActions";
import { RootState } from "../../reducers/rootReducer";
import { HeroSelectionActionTypes } from "../../types/heroSelectionTypes";
import HeroDescription from "./HeroDescription/HeroDescription";
import Heroes from "./Heroes/Heroes";


const mapStateToProps = (state: RootState) => ({
  hero: state.heroSelectionReducer.hero,
  visible: state.heroSelectionReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setHeroSelectionVisible: (visible: boolean) => dispatch(setHeroSelectionVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

};

const HeroSelection = (props: Props) => {

  useEffect(() => {
    const scene = $("#heroSelectionScene") as ScenePanel;
    if (props.hero) {
      scene.LerpToCameraEntity(props.hero.camera, 1.0);
    } else {
      scene.LerpToCameraEntity('camera_main', 1.0);
    }
  }, [props.hero]);

  useGameEvent("on_select_hero_success", () => {
    Game.EmitSound("HeroPicker.Selected");
    props.setHeroSelectionVisible(false);
  }, []);

  useGameEvent("on_select_hero_error", () => {
    GameUI.SendCustomHUDError("Unable To Select Hero", "General.InvalidTarget_Invulnerable");
  }, []);

  return (
    <Panel className={"heroSelectionContainer"} >
      <DOTAScenePanel
        id={'heroSelectionScene'}
        className={'heroSelectionBackground'}
        map="heroSelection"
        particleonly={false}
        light={'light'}
        camera={'camera_main'}
      />
      <Heroes />
      <HeroDescription hero={props.hero} />
    </Panel>
  );

}

export default connector(HeroSelection);
