import React, { useState } from "react";
import { useNetTableValues } from "react-panorama";
import { useInterval } from "../../hooks/useInterval";
import lodash from 'lodash';
import FloatingContainer from "./FloatingContainer/FloatingContainer";
import { HUD_THINK_FAST } from "../../App";

const MAX_DISTANCE = 4000;

const FloatingContainers = () => {

  // $.Msg("REACT-RENDER: FloatingContainers rendered");

  const units = useNetTableValues('FloatingBarUnits').units;

  const [entityIndexes, setEntityIndexes] = useState<EntityIndex[]>([]);

  useInterval(() => {
    const centerOrigin = Game.ScreenXYToWorld(Game.GetScreenWidth() / 2, Game.GetScreenHeight() / 2);
    const newEntityIndexes = Object.values(units)
      .filter(entity => Entities.IsSelectable(entity))
      .filter(entity => Game.Length2D(centerOrigin, Entities.GetAbsOrigin(entity)) < MAX_DISTANCE)
      .sort();
    if (!lodash.isEqual(entityIndexes, newEntityIndexes)) {
      setEntityIndexes(newEntityIndexes);
    }
  }, HUD_THINK_FAST)

  return (
    <React.Fragment>
      {entityIndexes.map(entityIndex => <FloatingContainer key={entityIndex} entityIndex={entityIndex} />)}
    </React.Fragment>
  );

}

export default React.memo(FloatingContainers);
