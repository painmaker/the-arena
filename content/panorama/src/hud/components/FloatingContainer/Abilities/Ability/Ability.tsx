import React, { Dispatch, SetStateAction, useState } from "react";
import { useInterval } from "../../../../hooks/useInterval";
import { useTimeout } from "../../../../hooks/useTimeout";
import { IAbility } from "../Abilities";
import Styles from './styles.module.css';

type Props = {
  id: number,
  name: string,
  isItem: boolean,
  setAbilities: Dispatch<SetStateAction<IAbility[]>>
};

const Ability = (props: Props) => {

  const { id, name, isItem, setAbilities } = props;


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
    <Panel
      className={Styles.container}
      style={{
        position: "0px " + posY + "px " + "0px",
        opacity: opacity,
      }}
    >
      {isItem && (
        <DOTAItemImage
          showtooltip={false}
          itemname={name}
          className={Styles.image}
        />
      )}
      {!isItem && (
        <DOTAAbilityImage
          showtooltip={false}
          abilityname={name}
          className={Styles.image}
        />
      )}
      <Label
        html={true}
        text={$.Localize("DOTA_Tooltip_Ability_" + name)}
        className={Styles.label}
      />
    </Panel>
  );

}

export default React.memo(Ability);