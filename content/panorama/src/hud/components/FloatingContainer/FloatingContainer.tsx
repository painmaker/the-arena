import React, { useEffect, useState } from "react";
import { useNetTableValues } from "react-panorama";
import { objectsEqual } from "../../utils/ObjectUtils";
import { TableUtils } from "../../utils/TableUtils";
import HealthBar from "./HealthBar/HealthBar";
import ManaBar from "./ManaBar/ManaBar";
import Abilities from "./Abilities/Abilities";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

interface IFloatingBar {
  unit: EntityIndex,
  screenX: number,
  screenY: number,
  visible: boolean,
}

type Props = ReactTimeoutProps & {
  // ownProps
}

const FloatingContainer = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars rendered");

  const { setInterval, clearInterval } = props;

  const units = useNetTableValues('FloatingBarUnits').units;

  const [floatingBars, setFloatingBars] = useState<IFloatingBar[]>([]);

  useEffect(() => {

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
    };

    const id = setInterval!(update, 5);

    return () => clearInterval!(id);

  }, [units, floatingBars, setInterval, clearInterval]);

  return (
    <React.Fragment>
      {floatingBars.map(floatingBar => {
        const { unit, screenX, screenY } = floatingBar;
        return (
          <Panel key={unit} style={Styles.Container(screenX - 125, screenY - 500, 0)}>
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

export default React.memo(ReactTimeout(FloatingContainer));