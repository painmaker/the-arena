import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {}

const LevelUp = (props: Props) => {

  const [isInLearnMode, setisInLearnMode] = useState(Game.IsInAbilityLearnMode());
  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    props.setInterval(() => {
      setisInLearnMode(Game.IsInAbilityLearnMode());
      setAbilityPoints(Entities.GetAbilityPoints(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
  }, []);

  if (abilityPoints <= 0) {
    Game.EndAbilityLearnMode();
    return null;
  }

  if (isInLearnMode) {
    return null;
  }

  return (
    <Panel
      hittest={true}
      onactivate={() => Game.EnterAbilityLearnMode()}
      className={"levelUpContainer"}
    >
      <Label
        className={'levelUpLabel'}
        text={'Lvl. up!'}
      />
    </Panel>
  );

};

export default withReactTimeout(LevelUp);
