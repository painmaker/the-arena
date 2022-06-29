import React from 'react'
import Skillpoints from './Skillpoints/Skillpoints'
import LevelUpButton from './LevelUpButton/LevelUpButton'
import Styles from './styles.module.css'
import { AbilityEntityIndexContextProvider } from '../../../context/AbilityEntityIndexContext'
import Ability from './Ability/Ability'

type Props = {
	abilityEntityIndex: AbilityEntityIndex
}

const AbilityBarItem = (props: Props) => {
	$.Msg('REACT-RENDER: AbilityBarItem rendered')

	const { abilityEntityIndex } = props

	return (
		<Panel className={Styles.container}>
			<AbilityEntityIndexContextProvider abilityEntityIndex={abilityEntityIndex}>
				<LevelUpButton />
				<Ability />
				<Skillpoints />
			</AbilityEntityIndexContextProvider>
		</Panel>
	)
}

export default AbilityBarItem
