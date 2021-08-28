import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {}

const HealthBar = (props: Props) => {

  const [health, setHealth] = useState(Entities.GetHealth(Players.GetLocalPlayerPortraitUnit()));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(Players.GetLocalPlayerPortraitUnit()));
  const [healthRegen, setHealthRegen] = useState(Entities.GetHealthThinkRegen(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setHealth(Entities.GetHealth(Players.GetLocalPlayerPortraitUnit()));
      setMaxHealth(Entities.GetMaxHealth(Players.GetLocalPlayerPortraitUnit()));
      // Hack because panorama API method for health regen is bugged
      const entindex = Players.GetLocalPlayerPortraitUnit();
      const numberOfBuffs = Entities.GetNumBuffs(entindex);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(entindex, i);
        const name = Buffs.GetName(entindex, buff);
        if (name === 'modifier_ui_health_regen') {
          setHealthRegen(Buffs.GetStackCount(entindex, buff) / 100);
        }
      }
    }, 100);
    return () => props.clearInterval(id);
  }, []);

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
