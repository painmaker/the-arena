import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { HUD_THINK_FAST } from "../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { RootState } from "../../reducers/rootReducer";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
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

    update();
    const id = setInterval(update, HUD_THINK_FAST);

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

export default React.memo(connector(withReactTimeout(HealthBar)));
