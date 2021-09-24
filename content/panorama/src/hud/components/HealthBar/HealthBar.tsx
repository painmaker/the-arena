import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../hooks/useSelectedUnit";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  // ownProps
}

const HealthBar = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [health, setHealth] = useState(Entities.GetHealth(selectedUnit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(selectedUnit));
  const [healthRegen, setHealthRegen] = useState(Entities.GetHealthThinkRegen(selectedUnit));

  useEffect(() => {
    const id = setInterval(() => {
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
    }, 100);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={'healthProgressBar'}
        style={Styles.Progressbar()}
      >
        <DOTAScenePanel
          style={Styles.Scene(health, maxHealth)}
          map={'scenes/hud/healthbarburner'}
          camera={'camera_1'}
        />
      </ProgressBar>
      <Label style={Styles.HealthLabel()} text={health + " / " + maxHealth} />
      <Label style={Styles.RegenLabel()} text={'+ ' + healthRegen.toFixed(1)} />
    </Panel>
  );

};

export default withReactTimeout(HealthBar);
