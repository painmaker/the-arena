import React, { useState } from 'react'
import { useInterval } from '../../../hooks/useInterval'
import HealthBar from './HealthBar/HealthBar'
import ManaBar from './ManaBar/ManaBar'
import Abilities from './Abilities/Abilities'
import Styles from './styles.module.css'
import { HUD_THINK_FAST } from '../../../App'
import { isEqual } from '../../../utils/isEqual'

const CONTAINER_HEIGHT = 100
const CONTAINER_WIDTH = 250

type Props = {
	entityIndex: EntityIndex
}

const Content = React.memo((props: Props) => {
	$.Msg('Content Rendered')
	const { entityIndex } = props
	return (
		<>
			<Panel className={Styles.statusBarContainer}>
				{Entities.GetMaxMana(entityIndex) > 0 && <ManaBar entityIndex={entityIndex} />}
				<HealthBar entityIndex={entityIndex} />
			</Panel>
			<Panel className={Styles.abilitiesContainer}>
				<Abilities entityIndex={entityIndex} />
			</Panel>
		</>
	)
})

const FloatingContainer = (props: Props) => {
	// $.Msg("REACT-RENDER: FloatingContainer rendered");

	const { entityIndex } = props

	const [style, setStyle] = useState<Partial<VCSSStyleDeclaration>>({})

	useInterval(() => {
		const screenHeight = Game.GetScreenHeight()
		const scale = 1080 / screenHeight

		const origin = Entities.GetAbsOrigin(entityIndex)
		const offset = Entities.GetHealthBarOffset(entityIndex)

		const screenX = Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset)
		const screenY = Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset)

		const isVisible = GameUI.FindScreenEntities([
			Game.WorldToScreenX(origin[0], origin[1], origin[2]),
			Game.WorldToScreenY(origin[0], origin[1], origin[2]),
		])
			.map(screenEntity => screenEntity.entityIndex)
			.includes(entityIndex)

		const newX = screenX * scale - CONTAINER_WIDTH / 2
		const newY = screenY * scale - CONTAINER_HEIGHT

		const newStyle: Partial<VCSSStyleDeclaration> = {
			visibility: isVisible ? 'visible' : 'collapse',
			transform: `translatex(${newX}px) translatey(${newY}px)`,
			// position: `${newX}px ${newY}px 0px`,
		}

		setStyle(oldStyle => (isEqual(oldStyle, newStyle) ? oldStyle : newStyle))
	}, HUD_THINK_FAST)

	return (
		<Panel hittest={false} className={Styles.container} style={style}>
			<Content entityIndex={entityIndex} />
		</Panel>
	)
}

export default React.memo(FloatingContainer)
