import React, { useState } from "react";
import { useNetTableValues } from "react-panorama";
import HealthBar from "./HealthBar/HealthBar";
import ManaBar from "./ManaBar/ManaBar";
import Abilities from "./Abilities/Abilities";
import { useInterval } from "../../hooks/useInterval";
import Styles from './styles.module.css';
import { TableUtils } from "../../utils/TableUtils";
import { ObjectUtils } from "../../utils/ObjectUtils";
interface IFloatingBar {
  unit: EntityIndex,
  screenX: number,
  screenY: number,
  visible: boolean,
}

type Props = {
  // ownProps
}

const FloatingContainer = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars rendered");

  const units = useNetTableValues('FloatingBarUnits').units;

  const [floatingBars, setFloatingBars] = useState<IFloatingBar[]>([]);

  useInterval(() => {
    const centerOrigin = Game.ScreenXYToWorld(Game.GetScreenWidth() / 2, Game.GetScreenHeight() / 2);
    const scale = 1080 / Game.GetScreenHeight();

    const mFloatingBars = Entities.GetAllEntities()
      .filter(entity => Entities.IsSelectable(entity))
      .filter(entity => Object.values(units).includes(entity))
      .filter(entity => Game.Length2D(centerOrigin, Entities.GetAbsOrigin(entity)) < 3500)
      .map(unit => {

        const unitOrigin = Entities.GetAbsOrigin(unit);

        const offsetX = (centerOrigin[0] - unitOrigin[0]) / 20;
        const offsetY = (centerOrigin[1] - unitOrigin[1]) / 20;
        const offsetZ = Entities.GetHealthBarOffset(unit) + 100;

        const offsetScreenX = scale * Game.WorldToScreenX(
          unitOrigin[0] + offsetX,
          unitOrigin[1] + offsetY,
          unitOrigin[2] + offsetZ
        );

        const offsetScreenY = scale * Game.WorldToScreenY(
          unitOrigin[0] + offsetX,
          unitOrigin[1] + offsetY,
          unitOrigin[2] + offsetZ
        );

        const screenWorldPosition = GameUI.GetScreenWorldPosition([
          Game.WorldToScreenX(unitOrigin[0], unitOrigin[1], unitOrigin[2]),
          Game.WorldToScreenY(unitOrigin[0], unitOrigin[1], unitOrigin[2])
        ]);

        return {
          unit,
          screenX: offsetScreenX,
          screenY: offsetScreenY,
          visible: screenWorldPosition !== null
        };

      })
      .filter(screenPosition => screenPosition.visible);

    if (!TableUtils.areTablesEqual(mFloatingBars, floatingBars, ObjectUtils.areObjectsEqual)) {
      setFloatingBars(mFloatingBars);
    }
  }, 5)

  return (
    <React.Fragment>
      {floatingBars.map(floatingBar => {
        const { unit, screenX, screenY } = floatingBar;
        return (
          <Panel
            key={unit}
            className={Styles.container}
            style={{ position: (screenX - 125) + "px " + (screenY - 500) + "px " + 0 + "px" }}
          >
            {Entities.GetMaxMana(unit) > 0 && (
              <ManaBar unit={unit} />
            )}
            <HealthBar unit={unit} />
            <Abilities unit={unit} />
          </Panel>
        )
      })}
    </React.Fragment>
  );

}

export default React.memo(FloatingContainer);