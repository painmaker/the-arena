import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { setSelectedUnit } from '../../actions/selectedUnitActions';
import { HUD_THINK_FAST } from '../../App';
import withReactTimeout, { ReactTimeoutProps } from '../../hoc/ReactTimeout';
import { RootState } from '../../reducers/rootReducer';
import { SelectedUnitActionTypes } from '../../types/selectedUnitTypes';
import { Styles } from './Styles';

const excludedUnits = [
  "shopkeeper_abilities"
]

const getGameUnitSelected = () => {

  const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer());
  if (queryUnit !== -1) {
    return queryUnit;
  }

  const portraitUnit = Players.GetLocalPlayerPortraitUnit();
  if (portraitUnit !== -1) {
    return portraitUnit
  }

  return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());

}

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const mapDispatchToProps = (dispatch: Dispatch<SelectedUnitActionTypes>) => ({
  setSelectedUnit: (selectedUnit: EntityIndex) => dispatch(setSelectedUnit(selectedUnit)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const SelectedUnit = (props: Props) => {

  $.Msg("REACT-RENDER: SelectedUnit rendered");

  const { selectedUnit, setSelectedUnit, setInterval, clearInterval } = props;

  useEffect(() => {
    const update = () => {
      const unitToSelect = getGameUnitSelected();
      if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
        setSelectedUnit(unitToSelect)
      }
    };
    const id = setInterval(update, HUD_THINK_FAST);
    return () => clearInterval(id);
  }, [setSelectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={Styles.Container()}>
      <Label
        text={$.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase()}
        style={Styles.Label()}
      />
    </Panel>
  )

};

export default connector(withReactTimeout(SelectedUnit));
