import React, { useEffect, useState } from "react";
import { useNetTableValues } from "react-panorama";
import { SCHEDULE_THINK_FAST } from "../../App";
import { getHudElement } from "../../utils/HudElements";
import { cancelSchedule } from "../../utils/Schedule";

type Props = {
  children?: React.ReactNode,
}

const Container = (props: Props) => {

  const [isChatActive, setIsChatActive] = useState(false);

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update)
      const isActive = getHudElement('HudChat')?.BHasClass('Active');
      setIsChatActive(isActive !== undefined ? isActive : false);
    };
    update();
    return () => cancelSchedule(schedule, Container.name);
  }, []);

  return (
    <Panel
      style={{
        width: hasPickedHero ? '465px' : '565px',
        height: '290px',
        flowChildren: 'down',
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
        marginBottom: hasPickedHero ? '414px' : '264px',
        marginLeft: hasPickedHero ? '10px' : '75px',
        padding: '10px',
        backgroundColor: isChatActive ? 'rgba(0, 0, 0, 0.7)' : 'none',
        borderRadius: '0px 0px 5px 5px',
        transform: 'scaleY(-1)',
        overflow: 'clip',
        zIndex: 10,
      }}>
      {props.children}
    </Panel>
  );

}

export default React.memo(Container);