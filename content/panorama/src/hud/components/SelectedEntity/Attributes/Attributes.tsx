import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../App'
import { useInterval } from '../../../hooks/useInterval'
import Attribute from './Attribute/Attribute'
import Styles from './styles.module.css'

const attributes = {
	DOTA_ATTRIBUTE_STRENGTH: 0,
	DOTA_ATTRIBUTE_AGILITY: 1,
	DOTA_ATTRIBUTE_INTELLECT: 2,
}

type Props = {
	selectedEntityIndex: EntityIndex
}

const Attributes = (props: Props) => {
	// $.Msg("REACT-RENDER: Character - Attributes rendered");

	const { selectedEntityIndex } = props

	const [strengthBase, setStrengthBase] = useState<number | undefined>(undefined)
	const [strengthBonus, setStrengthBonus] = useState<number | undefined>(undefined)

	const [agilityBase, setAgilityBase] = useState<number | undefined>(undefined)
	const [agilityBonus, setAgilityBonus] = useState<number | undefined>(undefined)

	const [intellectBase, setIntellectBase] = useState<number | undefined>(undefined)
	const [intellectBonus, setIntellectBonus] = useState<number | undefined>(undefined)

	const [primaryAttribute, setPrimaryAttribute] = useState<number | undefined>(undefined)

	useInterval(() => {
		if (Entities.IsHero(selectedEntityIndex)) {
			const numberOfBuffs = Entities.GetNumBuffs(selectedEntityIndex)
			for (let i = 0; i < numberOfBuffs; i += 1) {
				const buff = Entities.GetBuff(selectedEntityIndex, i)
				const name = Buffs.GetName(selectedEntityIndex, buff)
				if (name === 'modifier_ui_attribute_strength_base') {
					setStrengthBase(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
				if (name === 'modifier_ui_attribute_strength_bonus') {
					setStrengthBonus(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
				if (name === 'modifier_ui_attribute_agility_base') {
					setAgilityBase(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
				if (name === 'modifier_ui_attribute_agility_bonus') {
					setAgilityBonus(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
				if (name === 'modifier_ui_attribute_intellect_base') {
					setIntellectBase(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
				if (name === 'modifier_ui_attribute_intellect_bonus') {
					setIntellectBonus(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
				if (name === 'modifier_ui_primary_attribute') {
					setPrimaryAttribute(Buffs.GetStackCount(selectedEntityIndex, buff))
				}
			}
		}
	}, HUD_THINK_MEDIUM)

	return (
		<Panel className={Styles.container}>
			<Panel className={Styles.row}>
				<Attribute
					imgSrc='file://{images}/primary_attribute_icon_strength.png'
					isPrimaryAttribute={primaryAttribute === attributes.DOTA_ATTRIBUTE_STRENGTH}
					base={strengthBase}
					bonus={strengthBonus}
				/>
			</Panel>
			<Panel className={Styles.row}>
				<Attribute
					imgSrc='file://{images}/primary_attribute_icon_agility.png'
					isPrimaryAttribute={primaryAttribute === attributes.DOTA_ATTRIBUTE_AGILITY}
					base={agilityBase}
					bonus={agilityBonus}
				/>
			</Panel>
			<Panel className={Styles.row}>
				<Attribute
					imgSrc='file://{images}/primary_attribute_icon_intelligence.png'
					isPrimaryAttribute={primaryAttribute === attributes.DOTA_ATTRIBUTE_INTELLECT}
					base={intellectBase}
					bonus={intellectBonus}
				/>
			</Panel>
		</Panel>
	)
}

export default React.memo(Attributes)
