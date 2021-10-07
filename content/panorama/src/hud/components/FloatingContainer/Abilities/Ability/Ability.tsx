import React, { useEffect, useState } from "react";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  name: string,
};

const Ability = (props: Props) => {

  const { name } = props;

  const [posY, setPosY] = useState(75);
  const [opacity, setOpacity] = useState('1.0');

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setPosY(prevState => prevState - 0.5)
      schedule = $.Schedule(0.01, update);
    }
    update();
    return () => cancelSchedule(schedule, Ability.name)
  }, []);

  useEffect(() => {
    let schedule = $.Schedule(0.75, () => {
      setOpacity('0.0');
      schedule = -1 as ScheduleID;
    });
    return () => cancelSchedule(schedule, Ability.name)
  }, []);

  return (
    <Panel style={Styles.Container(posY, opacity)}>
      <DOTAAbilityImage
        showtooltip={false}
        abilityname={name}
        style={Styles.Image()}
      />
      <Label
        html={true}
        text={$.Localize("DOTA_Tooltip_Ability_" + name)}
        style={Styles.Label()}
      />
    </Panel>
  );

}

export default React.memo(Ability);