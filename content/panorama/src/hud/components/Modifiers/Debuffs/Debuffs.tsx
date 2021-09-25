import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { useSelectedUnit } from "../../../hooks/useSelectedUnit";
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
    $.Msg(Buffs.GetName(unit, buff))
    debuffs.push(buff);
  }
  return debuffs;
}

const Debuffs = () => {

  $.Msg("REACT-RENDER: Debuffs rendered");

  const selectedUnit = useSelectedUnit();
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

export default Debuffs;
