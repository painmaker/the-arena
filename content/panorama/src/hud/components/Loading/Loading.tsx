import React, { useState } from 'react';
import { HUD_THINK_SLOW } from '../../App';
import { useTimeout } from '../../hooks/useTimeout';
import { Styles } from './Styles';

type Props = {
  children: React.ReactNode
}

const Loading = (props: Props) => {

  // $.Msg("REACT-RENDER: Loading rendered");

  const [isLoading, setIsLoading] = useState(true);

  useTimeout(() => {
    setIsLoading(false);
  }, HUD_THINK_SLOW);

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