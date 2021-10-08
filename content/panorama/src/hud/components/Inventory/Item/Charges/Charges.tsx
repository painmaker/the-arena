import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex
};

const Charges = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Charges rendered");

  const { item } = props;

  const [shouldDisplayCharges, setShouldDisplayCharges] = useState(Items.ShouldDisplayCharges(item))
  const [charges, setCharges] = useState(Items.GetCurrentCharges(item))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setShouldDisplayCharges(Items.ShouldDisplayCharges(item));
      setCharges(Items.GetCurrentCharges(item));
    };
    update();
    return () => cancelSchedule(schedule, Charges.name);
  }, [item]);

  return (
    <React.Fragment>
      {shouldDisplayCharges && (
        <Label style={Styles.Container()} text={charges} />
      )}
    </React.Fragment>
  );

};

export default React.memo(Charges);
