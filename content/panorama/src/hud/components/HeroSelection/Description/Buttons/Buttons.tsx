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

  const selectedHeroes = useNetTableValues('SelectedHero');

  const isSelected = Object.values(selectedHeroes).some(hero => props.focusedHero && props.focusedHero.heroname === hero.heroname);

  return (
    <Panel className={'heroSelectionDescriptionButtonsContainer'}>
      <Button
        className={'heroSelectionDescriptionSelectHeroBtn'}
        onactivate={() => GameEvents.SendCustomGameEventToServer("on_select_hero", { heroname: props.focusedHero.heroname })}
        style={{ backgroundColor: isSelected ? 'grey' : 'olivedrab' }}
      >
        <Label
          className={'heroSelectionDescriptionSelectHeroBtnLabel'}
          text={'Select Hero'}
        />
      </Button>
      <Button
        className={'heroSelectionDescriptionCancelHeroBtn'}
        onactivate={() => props.resetFocusedHero()}
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
