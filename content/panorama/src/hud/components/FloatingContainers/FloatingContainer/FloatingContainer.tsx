import React, { useState } from 'react';
import { useInterval } from '../../../hooks/useInterval';
import HealthBar from './HealthBar/HealthBar';
import ManaBar from './ManaBar/ManaBar';
import Abilities from './Abilities/Abilities';
import Styles from './styles.module.css';
import { isEqual } from '../../../utils/isEqual';
import { HUD_THINK_FAST } from '../../../App';

const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 250;

type Props = {
  entityIndex: EntityIndex,
}

type Data = {
  x: number,
  y: number,
  isVisible: boolean,
}

const FloatingContainer = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingContainer rendered");

  const { entityIndex } = props;

  const [data, setData] = useState<Data>({x: 0, y: 0, isVisible: false})

  useInterval(() => {

    const screenWidth = Game.GetScreenWidth();
    const screenHeight = Game.GetScreenHeight();
    const scale = 1080 / screenHeight;

    const origin = Entities.GetAbsOrigin(entityIndex);
    const offset = Entities.GetHealthBarOffset(entityIndex);

    const screenY = Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset);
    const screenX = Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset);

    const x = scale * Math.min(screenWidth, Math.max(0, screenY)) - (CONTAINER_WIDTH / 2);
    const y = scale * Math.min(screenHeight, Math.max(0, screenX)) - CONTAINER_HEIGHT;

    const isVisible = GameUI.FindScreenEntities([
      Game.WorldToScreenX(origin[0], origin[1], origin[2]),
      Game.WorldToScreenY(origin[0], origin[1], origin[2])
    ]).map(screenEntity => screenEntity.entityIndex).includes(entityIndex);

    const newData = { x, y, isVisible};

    if (!isEqual(data, newData)) {
      setData(newData);
    }

  }, HUD_THINK_FAST)

  return (
    <Panel
      hittest={false}
      className={Styles.container}
      style={{
        visibility: data.isVisible ? 'visible' : 'collapse',
        transform: `translatex(${data.x}px) translatey(${data.y}px)`,
        // position: `${data.x}px ${data.y}px 0px`,
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