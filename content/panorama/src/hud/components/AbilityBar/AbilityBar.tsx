import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {}

const AbilityBar = (props: Props) => {

  const [entindex, setEntindex] = useState(Players.GetLocalPlayerPortraitUnit());
  const [isInLearningMode, setIsInLearningMode] = useState(Game.IsInAbilityLearnMode());

  useGameEvent("dota_player_update_query_unit", () => {
    // $.Msg("dota_player_update_query_unit")
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    // $.Msg("dota_player_update_selected_unit")
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useGameEvent("dota_portrait_ability_layout_changed", () => {
    // $.Msg("dota_portrait_ability_layout_changed")
  }, []);

  useGameEvent("dota_ability_changed", () => {
    // $.Msg("dota_ability_changed")
  }, []);

  useGameEvent("dota_hero_ability_points_changed", () => {
    // $.Msg("dota_hero_ability_points_changed")
  }, []);

  useGameEvent("dota_player_learned_ability", () => {
    // $.Msg("dota_player_learned_ability")
    if (Entities.GetAbilityPoints(entindex) <= 0) {
      Game.EndAbilityLearnMode();
    }
  }, []);

  useEffect(() => {
    const id = props.setInterval(() => {
      setIsInLearningMode(Game.IsInAbilityLearnMode());
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  if (entindex === undefined || entindex === -1) {
    return null;
  }

  const abilityCount = Entities.GetAbilityCount(entindex);

  if (abilityCount === undefined || abilityCount <= 0) {
    return null;
  }

  return (
    <Panel hittest={false} style={Styles.Container()}>
      {Array.from(Array(abilityCount).keys()).map(abilityNumber => {
        const abilityEntityIndex = Entities.GetAbility(entindex, abilityNumber);
        if (abilityEntityIndex == -1 || !Abilities.IsDisplayedAbility(abilityEntityIndex)) {
          return null;
        }
        return (
          <AbilityBarItem
            key={entindex + "_ability_" + abilityNumber}
            ability={abilityEntityIndex}
            unit={entindex}
            isInLearningMode={isInLearningMode}
          />
        );
      })}
    </Panel>
  );

};

export default withReactTimeout(AbilityBar);

