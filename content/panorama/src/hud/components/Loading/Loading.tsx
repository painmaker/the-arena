import React, { useEffect, useState } from 'react';
import { SCHEDULE_THINK_SLOW } from '../../App';
import withReactTimeout, { ReactTimeoutProps } from '../../hoc/ReactTimeout';
import { Styles } from './Styles';

type Props = ReactTimeoutProps & {}

const Loading: React.FunctionComponent<Props> = props => {

  $.Msg("REACT-RENDER: Loading rendered");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const schedule = $.Schedule(SCHEDULE_THINK_SLOW, () => setIsLoading(false));
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
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

export default React.memo(withReactTimeout(Loading));