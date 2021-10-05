import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { SCHEDULE_THINK_FAST } from "../../App";
import { RootState } from "../../reducers/rootReducer";
import { cancelSchedule } from "../../utils/Schedule";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const HealthBar = (props: Props) => {

  // $.Msg("REACT-RENDER: HealthBar rendered");

  const { selectedUnit } = props;

  const [health, setHealth] = useState(Entities.GetHealth(selectedUnit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(selectedUnit));
  const [healthRegen, setHealthRegen] = useState(Entities.GetHealthThinkRegen(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
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
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, HealthBar.name);
  }, [selectedUnit]);

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
        />
      </ProgressBar>
      <Label style={Styles.HealthLabel()} text={health + " / " + maxHealth} />
      <Label style={Styles.RegenLabel()} text={'+ ' + healthRegen.toFixed(1)} />
    </Panel>
  );

};

export default React.memo(connector(HealthBar));
