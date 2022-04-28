import React, { Dispatch } from "react";
import { useNetTableValues } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { resetFocusedHero } from "../../../../actions/heroSelectionActions";
import { FocusedHero, HeroSelectionActionTypes } from "../../../../interfaces/heroSelectionTypes";
import Styles from "./styles.module.css";

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
    <Panel className={Styles.container}>
      <Button
        className={Styles.selectButton}
        onactivate={() => {
          Game.EmitSound("ui_topmenu_select");
          GameEvents.SendCustomGameEventToServer("on_select_hero", { heroname: props.focusedHero.heroname })
        }}
        style={{
          backgroundColor: isPicked ? 'rgb(50, 50, 50)' : 'gradient( linear, 0% 0%, 0% 100%, from( #5aa15e ), to( #87d69533 ) )'
        }}
      >
        {!isPicked && (
          <Label
            className={Styles.selectButtonLabel}
            text={'SELECT HERO'}
          />
        )}
        {isPicked && (
          <Image
            className={Styles.selectButtonLockIcon}
            src="s2r://panorama/images/lock_white_png.vtex"
          />
        )}
      </Button>
      <Button
        className={Styles.cancelButton}
        onactivate={() => {
          Game.EmitSound("ui_topmenu_select");
          props.resetFocusedHero();
        }}
      >
        <Label
          className={Styles.cancelButtonLabel}
          text={'CANCEL'}
        />
      </Button>
    </Panel>
  );

};

export default connector(Buttons);
