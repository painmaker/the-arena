import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";

type Props = {
  selectedUnit: EntityIndex,
};

const Gold = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Gold rendered");

  const { selectedUnit } = props;

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => cancelSchedule(schedule, Gold.name);
  }, [selectedUnit])

  return (
    <Panel className={'shopGoldContainer'}>
      <Panel className={'shopGoldImage'} />
      <Label className={'shopGoldLabel'} text={playerGold} />
    </Panel>
  );

};

export default React.memo(Gold);
