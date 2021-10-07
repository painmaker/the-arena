import React from 'react';
import { Styles } from './Styles';

type Props = {
  selectedUnit: EntityIndex,
};

const SelectedUnit = (props: Props) => {
  // $.Msg("REACT-RENDER: SelectedUnit rendered");
  const { selectedUnit } = props;
  return (
    <Panel style={Styles.Container()}>
      <Label
        text={$.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase()}
        style={Styles.Label()}
      />
    </Panel>
  )
};

export default React.memo(SelectedUnit);
