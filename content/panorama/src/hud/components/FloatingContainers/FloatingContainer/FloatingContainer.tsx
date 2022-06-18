import React, { useState } from 'react';
import { useInterval } from '../../../hooks/useInterval';
import HealthBar from './HealthBar/HealthBar';
import ManaBar from './ManaBar/ManaBar';
import Abilities from './Abilities/Abilities';
import Styles from './styles.module.css';

const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 250;

type Props = {
  unit: EntityIndex,
}

type Position = {
  x: number,
  y: number,
}

const FloatingContainer = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingContainer rendered");

  const { unit } = props;

  const [position, setPosition] = useState<Position>({x: 0, y: 0})

  useInterval(() => {

    const screenWidth = Game.GetScreenWidth();
    const screenHeight = Game.GetScreenHeight();
    const scale = 1080 / screenHeight;

    const origin = Entities.GetAbsOrigin(unit);
    const offset = Entities.GetHealthBarOffset(unit);

    const screenY = Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset);
    const screenX = Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset);

    const x = scale * Math.min(screenWidth, Math.max(0, screenY)) - (CONTAINER_WIDTH / 2);
    const y = scale * Math.min(screenHeight, Math.max(0, screenX)) - CONTAINER_HEIGHT;

    setPosition({ x, y })

  })

  const style = { 
    transform: `translatex(${position.x}px) translatey(${position.y}px)`,
    // position: `${position.x}px ${position.y}px 0px`,
  }

  return (
    <Panel
      hittest={false}
      className={Styles.container}
      style={style}
    >
      <Panel  className={Styles.statusBarContainer}>
        {Entities.GetMaxMana(unit) > 0 && (
          <ManaBar unit={unit} />
        )}
        <HealthBar unit={unit} />
      </Panel>
      <Panel className={Styles.abilitiesContainer}>
        <Abilities unit={unit} />
      </Panel>
    </Panel>
  )

}

export default FloatingContainer