import React, { useEffect, useState } from 'react';
import { SCHEDULE_THINK_SLOW } from '../../App';
import { cancelSchedule } from '../../utils/Schedule';
import { Styles } from './Styles';

type Props = {
  children: React.ReactNode
}

const Loading = (props: Props) => {

  // $.Msg("REACT-RENDER: Loading rendered");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let schedule = $.Schedule(SCHEDULE_THINK_SLOW, () => {
      setIsLoading(false);
      schedule = -1 as ScheduleID;
    });
    return () => cancelSchedule(schedule, Loading.name);
  }, []);

  if (isLoading) {
    return (
      <Panel style={Styles.Container()}>
        <Label
          style={Styles.Label()}
          text={'LOADING...'}
        />
      </Panel>
    )
  } else {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }

};

export default React.memo(Loading);