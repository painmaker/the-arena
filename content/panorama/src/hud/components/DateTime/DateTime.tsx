import React, { useEffect, useState } from "react";
import { formatTime } from "../../../utils";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {}

const formatDate = (date: Date) => {
  const hours = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());
  return hours + ":" + minutes + ":" + seconds;
}

const DateTime = (props: Props) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = props.setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} className={'dateTimeContainer'}>
      <Label
        className={'dateTimeLabel'}
        text={date.toDateString()}
      />
      <Label
        className={'dateTimeLabel'}
        text={formatDate(date)}
      />
    </Panel>
  );

};

export default withReactTimeout(DateTime);
