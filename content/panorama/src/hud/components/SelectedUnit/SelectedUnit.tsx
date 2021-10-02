import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import withReactTimeout, { ReactTimeoutProps } from '../../hoc/ReactTimeout';
import { RootState } from '../../reducers/rootReducer';
import { Styles } from './Styles';


const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
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

export default connector(withReactTimeout(SelectedUnit));
