import React, { useState } from 'react';
import { HUD_THINK_SLOW } from '../../App';
import { useTimeout } from '../../hooks/useTimeout';
import Styles from './styles.module.css';

type Props = {
  children: React.ReactNode
}

const Loading = (props: Props) => {

  // $.Msg("REACT-RENDER: Loading rendered");

  const [isLoading, setIsLoading] = useState(true);

  useTimeout(() => {
    setIsLoading(false);
  }, 100);

  if (isLoading) {
    return (
      <Panel className={Styles.container}>
        <Label
          className={Styles.label}
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