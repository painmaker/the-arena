import React, { useEffect, useState } from "react";
import { useNetTableValues } from "react-panorama";
import { SCHEDULE_THINK_FAST } from "../../App";
import { objectsEqual } from "../../utils/ObjectUtils";
import { cancelSchedule } from "../../utils/Schedule";
import { TableUtils } from "../../utils/TableUtils";
import HealthBar from "./HealthBar/HealthBar";
import ManaBar from "./ManaBar/ManaBar";
import { Styles } from "./Styles";

interface IFloatingBar {
  unit: EntityIndex,
  screenX: number,
  screenY: number,
  visible: boolean,
}

const FloatingBars = () => {

  // $.Msg("REACT-RENDER: FloatingBars rendered");

  const units = useNetTableValues('FloatingBarUnits').units;

  const [floatingBars, setFloatingBars] = useState<IFloatingBar[]>([]);

  useEffect(() => {

    let schedule = -1 as ScheduleID;

    const update = () => {

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

      if (!TableUtils.isEqual(mFloatingBars, floatingBars, objectsEqual)) {
        setFloatingBars(mFloatingBars);
      }
      schedule = $.Schedule(0.01, update)
    };
    update();
    return () => cancelSchedule(schedule, FloatingBars.name);
  }, [units, floatingBars]);

  return (
    <React.Fragment>
      {floatingBars.map(floatingBar => {
        const { unit, screenX, screenY } = floatingBar;
        return (
          <Panel key={unit} style={Styles.Container(screenX - 40, screenY, 0)}>
            <HealthBar unit={unit} />
            {Entities.GetMaxMana(unit) > 0 && (
              <ManaBar unit={unit} />
            )}
          </Panel>
        )
      })}
    </React.Fragment>
  );

}

export default React.memo(FloatingBars);