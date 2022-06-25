import React, { useState } from 'react';
import { useInterval } from '../../../hooks/useInterval';
import HealthBar from './HealthBar/HealthBar';
import ManaBar from './ManaBar/ManaBar';
import Abilities from './Abilities/Abilities';
import Styles from './styles.module.css';
import { HUD_THINK_FAST } from '../../../App';

const CONTAINER_HEIGHT = 100;
const CONTAINER_WIDTH = 250;

type Props = {
  entityIndex: EntityIndex,
}

const FloatingContainer = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingContainer rendered");

  const { entityIndex } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useInterval(() => {

    const screenHeight = Game.GetScreenHeight();
    const scale = 1080 / screenHeight;

    const origin = Entities.GetAbsOrigin(entityIndex);
    const offset = Entities.GetHealthBarOffset(entityIndex);

    const screenX = Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset);
    const screenY = Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset);
    
    const isVisible = GameUI.FindScreenEntities([
      Game.WorldToScreenX(origin[0], origin[1], origin[2]),
      Game.WorldToScreenY(origin[0], origin[1], origin[2])
    ]).map(screenEntity => screenEntity.entityIndex).includes(entityIndex);

    setX(screenX * scale - (CONTAINER_WIDTH / 2));
    setY(screenY * scale - CONTAINER_HEIGHT);
    setIsVisible(isVisible);

  }, HUD_THINK_FAST)

  return (
    <Panel
      hittest={false}
      className={Styles.container}
      style={{
        visibility: isVisible ? 'visible' : 'collapse',
        transform: `translatex(${x}px) translatey(${y}px)`,
        // position: `${x}px ${y}px 0px`,
      }}
    >
      <Panel className={Styles.statusBarContainer}>
        {Entities.GetMaxMana(entityIndex) > 0 && (
          <ManaBar entityIndex={entityIndex} />
        )}
        <HealthBar entityIndex={entityIndex} />
      </Panel>
      <Panel className={Styles.abilitiesContainer}>
        <Abilities entityIndex={entityIndex} />
      </Panel>
    </Panel>
  )

}

export default FloatingContainer