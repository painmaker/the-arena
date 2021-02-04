import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  entIndex: EntityIndex,
}

const Health = (props: Props) => {

  const [health, setHealth] = useState(Entities.GetHealth(props.entIndex));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(props.entIndex));

  useEffect(() => {
    props.setInterval(() => {
      setHealth(Entities.GetHealth(props.entIndex));
      setMaxHealth(Entities.GetMaxHealth(props.entIndex));
    }, 100)
  }, []);

  return (
    <Panel hittest={false} className={"heroesHealthContainer"}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className='heroesHealthProgressBar'
      />
    </Panel>
  );

};

export default withReactTimeout(Health);
