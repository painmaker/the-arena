import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  name: string,
};

const Ability = (props: Props) => {

  const { name, setInterval, clearInterval, setTimeout, clearTimeout } = props;

  const [posY, setPosY] = useState(75);
  const [opacity, setOpacity] = useState('1.0');

  useEffect(() => {
    const update = () => setPosY(prevState => prevState - 0.5)
    const id = setInterval!(update, 10);
    return () => clearInterval!(id);
  }, [setInterval, clearInterval]);

  useEffect(() => {
    const update = () => setOpacity('0.0');
    const id = setTimeout!(update, 750)
    return () => clearTimeout!(id);
  }, [setTimeout, clearTimeout]);

  return (
    <Panel style={Styles.Container(posY, opacity)}>
      <DOTAAbilityImage
        showtooltip={false}
        abilityname={name}
        style={Styles.Image()}
      />
      <Label
        html={true}
        text={$.Localize("DOTA_Tooltip_Ability_" + name)}
        style={Styles.Label()}
      />
    </Panel>
  );

}

export default React.memo(ReactTimeout(Ability));