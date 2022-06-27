import React, { useContext, useState } from 'react'
import { Styles } from './Styles'
import Model from './Model/Model'
import Defense from './Defense/Defense'
import Title from './Title/Title'
import Level from './Level/Level'
import Avatar from './Avatar/Avatar'
import Attack from './Attack/Attack'
import { HUD_THINK_SLOW } from '../../App'
import useTimeout from '../../hooks/useTimeout'
import { WINDOW } from '../../data/windows'
import useGameEvent from '../../hooks/useGameEvent'
import { SelectedEntityIndexContext } from '../../context/SelectedEntityIndexContext'

const CharacterDetails = () => {
	// $.Msg("REACT-RENDER: CharacterDetails rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isOpen, setIsOpen] = useState(false)
	const [renderComponent, setRenderComponent] = useState(false)

	useTimeout(
		() => {
			setRenderComponent(isOpen)
		},
		!isOpen ? HUD_THINK_SLOW : 0,
	)

	useGameEvent(
		'set_window',
		event => {
			setIsOpen(event.window === WINDOW.CHARACTER_DETAILS)
		},
		[],
	)

	return (
		<Panel hittest={false} style={Styles.OuterContainer()}>
			{renderComponent && (
				<Panel style={Styles.InnerContainer(isOpen)}>
					<Title selectedUnit={selectedEntityIndex} />
					<Panel style={Styles.ColumnContainer()}>
						<Panel style={Styles.LeftColumn()}>
							<Model selectedUnit={selectedEntityIndex} />
							<Level selectedUnit={selectedEntityIndex} />
							<Avatar selectedUnit={selectedEntityIndex} />
						</Panel>
						<Panel style={Styles.RightColumn()}>
							<Attack selectedUnit={selectedEntityIndex} />
							<Defense selectedUnit={selectedEntityIndex} />
						</Panel>
					</Panel>
				</Panel>
			)}
		</Panel>
	)
}

export default React.memo(CharacterDetails)
