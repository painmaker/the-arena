import React, { useEffect, useState } from 'react';
import withReactTimeout, { ReactTimeoutProps } from '../../hoc/ReactTimeout';
import { Styles } from './Styles';

type Props = ReactTimeoutProps & {}

const Loading: React.FunctionComponent<Props> = props => {

  // $.Msg("REACT-RENDER: Loading rendered");

  const { setTimeout, clearTimeout } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const update = () => {
      setIsLoading(false);
    };
    const id = setTimeout(update, 500);
    return () => clearTimeout(id);

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

export default React.memo(withReactTimeout(Loading));