import React, { useState } from "react";
import { HUD_THINK_FAST, SelectedUnitContext } from "../../App";
import Styles from "./styles.module.css";
import { useInterval } from "../../hooks/useInterval";

const Health = () => {

  // $.Msg("REACT-RENDER: HealthBar rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [health, setHealth] = useState(Entities.GetHealth(selectedUnit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(selectedUnit));
  const [healthRegen, setHealthRegen] = useState(Entities.GetHealthThinkRegen(selectedUnit));

  useInterval(() => {
    setHealth(Entities.GetHealth(selectedUnit));
    setMaxHealth(Entities.GetMaxHealth(selectedUnit));
    // Hack because panorama API method for health regen is bugged
    const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
    for (let i = 0; i < numberOfBuffs; i++) {
      const buff = Entities.GetBuff(selectedUnit, i);
      const name = Buffs.GetName(selectedUnit, buff);
      if (name === 'modifier_ui_health_regen') {
        setHealthRegen(Buffs.GetStackCount(selectedUnit, buff) / 100);
      }
    }
  }, HUD_THINK_FAST);

  const isEnemy = Entities.IsEnemy(selectedUnit);

  return (
    <Panel className={Styles.container}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={isEnemy ? 'healthProgressBarEnemy' : 'healthProgressBar'}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          horizontalAlign: "center",
        }}
        onactivate={() => {
          if (GameUI.IsAltDown()) {
            GameEvents.SendCustomGameEventToAllClients("on_health_alerted", {
              broadcaster: Players.GetLocalPlayer(),
              selectedUnit,
            })
          }
        }}
      >
        <DOTAScenePanel
          id={'HealthBurner'}
          className={`${Styles.scene} + SceneLoaded`}
          style={{
            width: (health / maxHealth) * 100 + "%",
            washColor: isEnemy ? 'red' : 'none',
          }}
          map={'scenes/hud/healthbarburner'}
        />
      </ProgressBar>
      <Label
        className={Styles.healthLabel}
        text={health + "/" + maxHealth}
      />
      <Label
        className={Styles.regenLabel}
        style={{ color: isEnemy ? '#ff4433' : '#3ED038' }}
        text={'+ ' + healthRegen.toFixed(1)}
      />
    </Panel>
  );

};

export default React.memo(Health);
