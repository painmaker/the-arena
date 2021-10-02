import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { objectsEqual } from "../../utils/ObjectUtils";
import { TableUtils } from "../../utils/TableUtils";
import HealthBar from "./HealthBar/HealthBar";
import ManaBar from "./ManaBar/ManaBar";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  // ownProps
};

interface IFloatingBar {
  unit: EntityIndex,
  screenX: number,
  screenY: number,
  visible: boolean,
}

const FloatingBars = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars rendered");

  const { setInterval, clearInterval } = props;

  const [floatingBars, setFloatingBars] = useState<IFloatingBar[]>([]);

  useEffect(() => {

    const update = () => {

      const centerOrigin = Game.ScreenXYToWorld(Game.GetScreenWidth() / 2, Game.GetScreenHeight() / 2);
      const scale = 1080 / Game.GetScreenHeight();

      const mFloatingBars = Entities.GetAllHeroEntities()
        .filter(entity => Entities.IsSelectable(entity))
        .filter(entity => Entities.IsAlive(entity))
        .filter(entity => Game.Length2D(centerOrigin, Entities.GetAbsOrigin(entity)) < 3500)
        .map(unit => {

          const unitOrigin = Entities.GetAbsOrigin(unit);

          const healthBarOffset = Entities.GetHealthBarOffset(unit) + 100;
          const offsetX = (centerOrigin[0] - unitOrigin[0]) / 20;
          const offsetY = (centerOrigin[1] - unitOrigin[1]) / 20;

          const offsetScreenX = scale * Game.WorldToScreenX(
            unitOrigin[0] + offsetX,
            unitOrigin[1] + offsetY,
            unitOrigin[2] + healthBarOffset
          );

          const offsetScreenY = scale * Game.WorldToScreenY(
            unitOrigin[0] + offsetX,
            unitOrigin[1] + offsetY,
            unitOrigin[2] + healthBarOffset
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

    // update();
    const id = setInterval(update, 5);

    return () => clearInterval(id);

  }, [floatingBars, setInterval, clearInterval]);

  return (
    <React.Fragment>
      {floatingBars.map(floatingBar => {
        const { unit, screenX, screenY } = floatingBar;
        return (
          <Panel key={unit} style={Styles.Container(screenX - 40, screenY, 0)}>
            <HealthBar unit={unit} />
            <ManaBar unit={unit} />
          </Panel>
        )
      })}
    </React.Fragment>
  );

}

export default withReactTimeout(FloatingBars);