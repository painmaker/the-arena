import React from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import { Styles } from "./Styles";
import { RootState } from "../../reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Stats = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats rendered");

  const { selectedUnit } = props;

  return (
    <Panel style={Styles.Container()}>
      <Level selectedUnit={selectedUnit} />
      <Armor selectedUnit={selectedUnit} />
      <MagicResistance selectedUnit={selectedUnit} />
      <Damage selectedUnit={selectedUnit} />
      <MoveSpeed selectedUnit={selectedUnit} />
    </Panel>
  );

};

export default React.memo(connector(Stats));
