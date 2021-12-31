import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { Context } from "../../../App";
import Modifier from "../Modifier/Modifier";
import Styles from "./styles.module.css";

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
    debuffs.push(buff);
  }
  return debuffs.sort((b1, b2) => Buffs.GetRemainingTime(unit, b1) - Buffs.GetRemainingTime(unit, b2));
}

const Debuffs = () => {

  // $.Msg("REACT-RENDER: Debuffs rendered");

  const { selectedUnit } = React.useContext(Context);

  const [debuffs, setDebuffs] = useState<BuffID[]>(getDebuffs(Players.GetLocalPlayerPortraitUnit()));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    setDebuffs(getDebuffs(selectedUnit));
  }, [selectedUnit]);

  useEffect(() => {
    setDebuffs(getDebuffs(selectedUnit));
  }, [selectedUnit])

  return (
    <Panel className={Styles.container}>
      {debuffs.map((debuff) =>
        <Modifier
          key={debuff}
          buff={debuff}
          selectedUnit={selectedUnit}
        />
      )}
    </Panel>
  );

};

export default React.memo(Debuffs);
