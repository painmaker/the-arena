import React, { useEffect, useState } from 'react';
import { Styles } from './Styles';
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  children: React.ReactNode
}

const Loading = (props: Props) => {

  // $.Msg("REACT-RENDER: Loading rendered");

  const { setTimeout, clearTimeout } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const update = () => setIsLoading(false);
    const id = setTimeout!(update, 1000);
    return () => clearTimeout!(id);
  }, [setTimeout, clearTimeout]);

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

export default React.memo(ReactTimeout(Loading));