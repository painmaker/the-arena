import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  entIndex: EntityIndex,
}

const Mana = (props: Props) => {

  const [mana, setMana] = useState(Entities.GetMana(props.entIndex));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(props.entIndex));

  useEffect(() => {
    props.setInterval(() => {
      setMana(Entities.GetMana(props.entIndex));
      setMaxMana(Entities.GetMaxMana(props.entIndex));
    }, 100)
  }, []);

  return (
    <Panel hittest={false} className={"heroesManaContainer"}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className='heroesManaProgressBar'
      />
    </Panel>
  );

};

export default withReactTimeout(Mana);
