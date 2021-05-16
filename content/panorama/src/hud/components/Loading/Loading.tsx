import React, { useEffect, useState } from 'react';
import withReactTimeout, { ReactTimeoutProps } from '../../hoc/ReactTimeout';

type Props = ReactTimeoutProps & {}

const Loading: React.FunctionComponent<Props> = props => {

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const id = props.setTimeout(() => {
      setHidden(false);
    }, 2000);
    return () => props.clearTimeout(id);
  }, []);

  if (hidden) {
    return (
      <Panel style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <Label
          style={{
            verticalAlign: 'center',
            horizontalAlign: 'center',
            fontSize: '25px',
          }}
          text={'LOADING...'}
        />
      </Panel>
    )
  }

  return (
    <React.Fragment>
      { props.children}
    </React.Fragment>
  )

};

export default withReactTimeout(Loading);