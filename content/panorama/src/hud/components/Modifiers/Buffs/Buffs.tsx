import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import Modifier from "../Modifier/Modifier";
import { Styles } from "./Styles";

const getBuffs = (unit: EntityIndex) => {
  const buffs = [];
  for (let i = 0; i < Entities.GetNumBuffs(unit) + 1; i++) {
    const buff = Entities.GetBuff(unit, i);
    if (buff == -1) {
      continue;
    }
    if (Buffs.IsHidden(unit, buff)) {
      continue;
    }
    if (Buffs.IsDebuff(unit, buff)) {
      continue;
    }
    buffs.push(buff);
  }
  return buffs;
}

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const BuffsPanel = (props: Props) => {

  $.Msg("REACT-RENDER: Buffs rendered");

  const { selectedUnit } = props;
  const [buffs, setBuffs] = useState<BuffID[]>(getBuffs(selectedUnit));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    setBuffs(getBuffs(selectedUnit));
  }, [selectedUnit]);

  useEffect(() => {
    setBuffs(getBuffs(selectedUnit));
  }, [selectedUnit])

  return (
    <Panel style={Styles.Container()}>
      {buffs.map((buff) =>
        <Modifier
          key={buff}
          buff={buff}
          selectedUnit={selectedUnit}
          isDebuff={false}
        />
      )}
    </Panel>
  );

};

export default connector(BuffsPanel);
