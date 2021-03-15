import React, { Dispatch } from "react";
import { useNetTableValues } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { resetFocusedHero } from "../../../../actions/heroSelectionActions";
import { FocusedHero, HeroSelectionActionTypes } from "../../../../types/heroSelectionTypes";

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  focusedHero: FocusedHero,
}

const Buttons = (props: Props) => {

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;

  const isPicked = Object.values(heroes).find(hero => hero.heroname === props.focusedHero.heroname)?.picked === 1;

  return (
    <Panel className={'heroSelectionDescriptionButtonsContainer'}>
      <Button
        className={'heroSelectionDescriptionSelectHeroBtn'}
        onactivate={() => {
          Game.EmitSound("ui_topmenu_select");
          GameEvents.SendCustomGameEventToServer("on_select_hero", { heroname: props.focusedHero.heroname })
        }}
        style={{ backgroundColor: isPicked ? 'rgb(50, 50, 50)' : 'gradient( linear, 0% 0%, 0% 100%, from( #5Aa15E ), to( #87d69533 ) )' }}
      >
        {!isPicked && (
          <Label
            className={'heroSelectionDescriptionSelectHeroBtnLabel'}
            text={'Select Hero'}
          />
        )}
        {isPicked && (
          <Image
            className={'heroSelectionDescriptionSelectHeroBtnLocked'}
            src="s2r://panorama/images/lock_white_png.vtex"
          />
        )}
      </Button>
      <Button
        className={'heroSelectionDescriptionCancelHeroBtn'}
        onactivate={() => {
          Game.EmitSound("ui_topmenu_select");
          props.resetFocusedHero();
        }}
      >
        <Label
          className={'heroSelectionDescriptionCancelHeroBtnLabel'}
          text={'Cancel'}
        />
      </Button>
    </Panel>
  );

};

export default connector(Buttons);
