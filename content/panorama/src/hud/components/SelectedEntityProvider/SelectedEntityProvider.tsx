import React, { useCallback, useState } from 'react';
import { HUD_THINK_FAST } from '../../App';
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext';
import { useInterval } from '../../hooks/useInterval';

type Props = {
  children: JSX.Element | JSX.Element[]
}

const excludedUnits = ['shopkeeper_abilities']

const SelectedEntityProvider = (props: Props) => {

  $.Msg("REACT-RENDER: SelectedEntityProvider rendered");

  const { children } = props;

	const [selectedEntityIndex, setSelectedEntityIndex] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))

  const getSelectedEntityIndex = useCallback(() => {
    const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer())
    if (queryUnit !== -1) {
      return queryUnit
    }
    const portraitUnit = Players.GetLocalPlayerPortraitUnit()
    if (portraitUnit !== -1) {
      return portraitUnit
    }
    return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
  }, [])

  useInterval(() => {
		const newSelectedEntityIndex = getSelectedEntityIndex()
    const isExcluded = !excludedUnits.includes(Entities.GetUnitName(selectedEntityIndex))
    setSelectedEntityIndex(oldSelectedEntityIndex => isExcluded ? oldSelectedEntityIndex : newSelectedEntityIndex)
	}, HUD_THINK_FAST)

  return (
    <SelectedEntityIndexContext.Provider value={{ selectedEntityIndex }}>
      { children }
    </SelectedEntityIndexContext.Provider>
  )

}

export default SelectedEntityProvider;
