import React from 'react'
import Stacks from './Stacks/Stacks'
import Styles from './styles.module.css'

type Props = {
	modifier: BuffID
	selectedEntityIndex: EntityIndex
}

function Foreground(props: Props) {
	// $.Msg("REACT-RENDER: Modifiers - Foreground rendered");

	const { modifier, selectedEntityIndex } = props

	const ability = Buffs.GetAbility(selectedEntityIndex, modifier)
	const isItem = Abilities.IsItem(ability)

	return (
		<Panel className={Styles.container}>
			<Stacks unit={selectedEntityIndex} buff={modifier} />
			{!isItem && <DOTAAbilityImage className={Styles.image} abilityname={Abilities.GetAbilityName(ability)} />}
			{isItem && (
				<DOTAItemImage className={Styles.paddedImage} itemname={Buffs.GetTexture(selectedEntityIndex, modifier)} showtooltip={false} />
			)}
		</Panel>
	)
}

export default React.memo(Foreground)
