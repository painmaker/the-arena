import React, { useContext, useState } from "react";
import { Styles } from "./Styles";
import { useInterval } from "../../../../hooks/useInterval";
import { useTimeout } from "../../../../hooks/useTimeout";
import { SetAbilitiesContext } from "../Abilities";

type Props = {
  id: number,
  name: string,
};

const Ability = (props: Props) => {

  const { id, name } = props;

  const setAbilities = useContext(SetAbilitiesContext);

  const [posY, setPosY] = useState(75);
  const [opacity, setOpacity] = useState('1.0');

  useInterval(() => {
    setPosY(prevState => prevState - 0.5);
  }, 10);

  useTimeout(() => {
    setOpacity('0.0');
  }, 750);

  useTimeout(() => {
    setAbilities(prevState => prevState.filter(ability => ability.id !== id));
  }, 1000);

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

export default React.memo(Ability);