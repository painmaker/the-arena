import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const HealthBar = (props: Props) => {

  // $.Msg("REACT-RENDER: HealthBar rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [health, setHealth] = useState(Entities.GetHealth(selectedUnit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(selectedUnit));
  const [healthRegen, setHealthRegen] = useState(Entities.GetHealthThinkRegen(selectedUnit));

  useEffect(() => {
    const update = () => {
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
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

  const isEnemy = Entities.IsEnemy(selectedUnit);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={isEnemy ? 'healthProgressBarEnemy' : 'healthProgressBar'}
        style={Styles.Progressbar()}
      >
        <DOTAScenePanel
          id={'HealthBurner'}
          className={'SceneLoaded'}
          style={Styles.Scene(health, maxHealth, isEnemy)}
          map={'scenes/hud/healthbarburner'}
        />
      </ProgressBar>
      <Label
        style={Styles.HealthLabel()}
        text={health + " / " + maxHealth}
      />
      <Label
        style={Styles.RegenLabel(isEnemy)}
        text={'+ ' + healthRegen.toFixed(1)}
      />
    </Panel>
  );

};

export default React.memo(ReactTimeout(HealthBar));
