import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import Modifier from "../Modifier/Modifier";
import { Styles } from "./Styles";

const getDebuffs = (unit: EntityIndex) => {
  const debuffs = [];
  for (let i = 0; i < Entities.GetNumBuffs(unit); i++) {
    const buff = Entities.GetBuff(unit, i);
    if (buff == -1) {
      continue;
    }
    if (Buffs.IsHidden(unit, buff)) {
      continue;
    }
    if (!Buffs.IsDebuff(unit, buff)) {
      continue;
    }
    // $.Msg(Buffs.GetName(unit, buff))
    debuffs.push(buff);
  }
  return debuffs;
}

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Debuffs = (props: Props) => {

  // $.Msg("REACT-RENDER: Debuffs rendered");

  const { selectedUnit } = props;

  const [debuffs, setDebuffs] = useState<BuffID[]>(getDebuffs(Players.GetLocalPlayerPortraitUnit()));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    setDebuffs(getDebuffs(selectedUnit));
  }, [selectedUnit]);

  useEffect(() => {
    setDebuffs(getDebuffs(selectedUnit));
  }, [selectedUnit])

  return (
    <Panel style={Styles.Container()}>
      {debuffs.map((debuff) =>
        <Modifier
          key={debuff}
          buff={debuff}
          selectedUnit={selectedUnit}
          isDebuff={true}
        />
      )}
    </Panel>
  );

};

export default connector(Debuffs);
