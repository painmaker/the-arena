import React, { Dispatch, SetStateAction, useState } from "react";
import { HUD_THINK_FAST } from "../../../../../App";
import { useInterval } from "../../../../../hooks/useInterval";
import { useTimeout } from "../../../../../hooks/useTimeout";
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
  }, 0.03);

  useTimeout(() => {
    setOpacity('0.0');
  }, 0.75);

  useTimeout(() => {
    setAbilities(prevState => prevState.filter(ability => ability.id !== id));
  }, 1.0);

  return (
    <Panel
      className={Styles.container}
      style={{
        transform: `translatey(${posY}px)`,
        opacity: opacity,
      }}
    >
      {isItem && (
        <DOTAItemImage
          showtooltip={false}
          itemname={name}
          className={Styles.imageItem}
        />
      )}
      {!isItem && (
        <DOTAAbilityImage
          showtooltip={false}
          abilityname={name}
          className={Styles.imageAbility}
        />
      )}
      <Label
        html={true}
        text={$.Localize("#DOTA_Tooltip_Ability_" + name)}
        className={Styles.label}
      />
    </Panel>
  );

}

export default React.memo(Ability);