import React, { Dispatch, useEffect } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { setFocusedHero } from "../../actions/heroSelectionActions";
import { RootState } from "../../reducers/rootReducer";
import { FocusedHero, HeroSelectionActionTypes } from "../../types/heroSelectionTypes";
import Chat from "../Chat/Chat";
import Description from "./Description/description";
import Heroes from "./Heroes/Heroes";
import RandomHeroDialog from "./RandomHeroDialog/RandomHeroDialog";
import RemainingPlayers from "./RemainingPlayers/RemainingPlayers";
import Timer from "./Timer/Timer";


const mapStateToProps = (state: RootState) => ({
  focusedHero: state.heroSelectionReducer.focusedHero,
});

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setFocusedHero: (hero: FocusedHero) => dispatch(setFocusedHero(hero)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const HeroSelection = (props: Props) => {

  useEffect(() => {
    const scene = $("#heroSelectionScene") as ScenePanel;
    if (props.focusedHero) {
      scene.LerpToCameraEntity(props.focusedHero.camera, 1.0);
    } else {
      scene.LerpToCameraEntity('camera_main', 1.0);
    }
  }, [props.focusedHero]);

  useGameEvent('on_focus_hero_success', (event) => {
    props.setFocusedHero(event as FocusedHero);
    Game.EmitSound(event.sound);
  }, []);

  useGameEvent("on_select_hero_error", () => {
    GameUI.SendCustomHUDError("Unable To Select Hero", "General.InvalidTarget_Invulnerable");
  }, []);

  useGameEvent("on_random_hero_error", () => {
    GameUI.SendCustomHUDError("Unable To Random Hero", "General.InvalidTarget_Invulnerable");
  }, []);

  useGameEvent("hero_select_generic_error", () => {
    GameUI.SendCustomHUDError("Unexpected error occured during hero select", "General.InvalidTarget_Invulnerable");
  }, []);

  $.Msg("HeroSelection rendered");

  return (
    <Panel className={'heroSelectionContainer'} hittest={false} >
      <DOTAScenePanel
        hittest={false}
        id={'heroSelectionScene'}
        className={'heroSelectionBackground'}
        map="heroSelection"
        particleonly={false}
        light={'light'}
        camera={'camera_main'}
      >
        <Description focusedHero={props.focusedHero} />
        <RandomHeroDialog />
        <Timer />
        <RemainingPlayers />
        <Heroes />
      </DOTAScenePanel>
    </Panel>
  );

}

export default connector(HeroSelection);
