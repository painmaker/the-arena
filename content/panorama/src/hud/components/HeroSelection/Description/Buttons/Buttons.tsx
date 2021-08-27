import React, { Dispatch, useState } from "react";
import { useNetTableValues } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { resetFocusedHero } from "../../../../actions/heroSelectionActions";
import { FocusedHero, HeroSelectionActionTypes } from "../../../../types/heroSelectionTypes";
import { Styles } from "./Styles";

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  focusedHero: FocusedHero,
}

const Buttons = (props: Props) => {

  const [isHoveringCancel, setHoveringCancel] = useState(false);
  const [isHoveringSelect, setHoveringSelect] = useState(false);

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;

  const isPicked = Object.values(heroes).find(hero => hero.heroname === props.focusedHero.heroname)?.picked === 1;

  return (
    <Panel style={Styles.Container()}>
      <Button
        onmouseover={() => setHoveringSelect(true)}
        onmouseout={() => setHoveringSelect(false)}
        onactivate={() => {
          Game.EmitSound("ui_topmenu_select");
          GameEvents.SendCustomGameEventToServer("on_select_hero", { heroname: props.focusedHero.heroname })
        }}
        style={Styles.SelectButton(isPicked, isHoveringSelect)}
      >
        {!isPicked && (
          <Label
            style={Styles.SelectButtonLabel()}
            text={'SELECT HERO'}
          />
        )}
        {isPicked && (
          <Image
            style={Styles.SelectButtonLockIcon()}
            src="s2r://panorama/images/lock_white_png.vtex"
          />
        )}
      </Button>
      <Button
        style={Styles.CancelButton(isHoveringCancel)}
        onmouseover={() => setHoveringCancel(true)}
        onmouseout={() => setHoveringCancel(false)}
        onactivate={() => {
          Game.EmitSound("ui_topmenu_select");
          props.resetFocusedHero();
        }}
      >
        <Label
          style={Styles.CancelButtonLabel()}
          text={'CANCEL'}
        />
      </Button>
    </Panel>
  );

};

export default connector(Buttons);
