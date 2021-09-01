import React, { useEffect, useState } from 'react';
import withReactTimeout, { ReactTimeoutProps } from '../../hoc/ReactTimeout';
import { Styles } from './Styles';

type Props = ReactTimeoutProps & {}

const Loading: React.FunctionComponent<Props> = props => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = props.setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => props.clearTimeout(id);
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

export default withReactTimeout(Loading);