import React, { useState } from "react";
import { useNetTableValues } from "react-panorama";
import HealthBar from "./HealthBar/HealthBar";
import ManaBar from "./ManaBar/ManaBar";
import Abilities from "./Abilities/Abilities";
import { useInterval } from "../../hooks/useInterval";
import Styles from './styles.module.css';
import lodash from 'lodash';

const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 250;
interface IFloatingBar {
  unit: EntityIndex,
  screenX: number,
  screenY: number,
  visible: boolean,
}

const FloatingContainer = () => {

  // $.Msg("REACT-RENDER: FloatingBars rendered");

  const units = useNetTableValues('FloatingBarUnits').units;

  const [floatingBars, setFloatingBars] = useState<IFloatingBar[]>([]);

  useInterval(() => {

    const centerOrigin = Game.ScreenXYToWorld(Game.GetScreenWidth() / 2, Game.GetScreenHeight() / 2);
    const scale = 1080 / Game.GetScreenHeight();

    const screenWidth = Game.GetScreenWidth();
    const screenHeight = Game.GetScreenHeight();

    const mFloatingBars = Object.values(units)
      .filter(entity => Entities.IsSelectable(entity))
      .filter(entity => Game.Length2D(centerOrigin, Entities.GetAbsOrigin(entity)) < 4000)
      .map(unit => {

        const origin = Entities.GetAbsOrigin(unit);
        const offset = Entities.GetHealthBarOffset(unit);

        const screenY = Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset);
        const screenX = Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset);

        const onScreen = screenY > 0 && screenY < screenWidth && screenX > 0 && screenX < screenHeight;

        var x = scale * Math.min(screenWidth, Math.max(0, screenY));
        var y = scale * Math.min(screenHeight, Math.max(0, screenX));

        return {
          unit,
          screenX: x - (CONTAINER_WIDTH / 2),
          screenY: y - CONTAINER_HEIGHT,
          visible: onScreen
        };

      })
      .filter(screenPosition => screenPosition.visible);

    if (!lodash.isEqual(floatingBars, mFloatingBars)) {
      setFloatingBars(mFloatingBars);
    }

  }, 0.00001)

  return (
    <React.Fragment>
      {floatingBars.map(floatingBar => {
        const { unit, screenX, screenY } = floatingBar;
        return (
          <Panel
            hittest={false}
            key={unit}
            className={Styles.container}
            style={{ transform: `translatex(${screenX}px) translatey(${screenY}px)` }}
          >
            <Panel className={Styles.statusBarContainer}>
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
      })}
    </React.Fragment>
  );

}

export default React.memo(FloatingContainer);