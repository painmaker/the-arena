import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../App";
import Styles from "./styles.module.css";
import { useInterval } from "../../hooks/useInterval";

type Props = {
  selectedUnit: EntityIndex,
};

const Mana = (props: Props) => {

  // $.Msg("REACT-RENDER: ManaBar rendered");

  const { selectedUnit } = props;

  const [mana, setMana] = useState(Entities.GetMana(selectedUnit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(selectedUnit));
  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit));

  useInterval(() => {
    setMana(Entities.GetMana(selectedUnit));
    setMaxMana(Entities.GetMaxMana(selectedUnit));
    setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
  }, HUD_THINK_FAST);

  const width = (mana / maxMana) * 100

  return (
    <Panel
      hittest={false}
      className={Styles.container}
      style={{ visibility: maxMana > 0 ? 'visible' : 'collapse' }}
    >
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={`manaProgressBar`}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          horizontalAlign: "center",
        }}
        onactivate={() => {
          if (GameUI.IsAltDown()) {
            GameEvents.SendCustomGameEventToAllClients("on_mana_alerted", {
              broadcaster: Players.GetLocalPlayer(),
              selectedUnit,
            })
          }
        }}
      >
        <DOTAScenePanel
          className={Styles.scene}
          style={{ width: Number.isNaN(width) || !Number.isFinite(width) ? '100%' : width + "%" }}
          map={'scenes/hud/healthbarburner'}
        />
      </ProgressBar>
      <Label
        className={Styles.manaLabel}
        text={mana + " / " + maxMana}
      />
      <Label
        className={Styles.regenLabel}
        text={'+ ' + manaRegen.toFixed(1)}
      />
    </Panel>
  );

};

export default React.memo(Mana);
