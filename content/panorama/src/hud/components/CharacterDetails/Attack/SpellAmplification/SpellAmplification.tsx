import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../../App'
import useInterval from '../../../../hooks/useInterval'
import { Styles as ParentStyles } from '../Styles'

type Props = {
	selectedUnit: EntityIndex
}

const SpellAmplification = (props: Props) => {
	// $.Msg("REACT-RENDER: Character - SpellAmplification rendered");

	const { selectedUnit } = props

	const [spellAmp, setSpellAmp] = useState(Entities.GetAttackRange(selectedUnit))

	useInterval(() => {
		const numberOfBuffs = Entities.GetNumBuffs(selectedUnit)
		for (let i = 0; i < numberOfBuffs; i++) {
			const buff = Entities.GetBuff(selectedUnit, i)
			const name = Buffs.GetName(selectedUnit, buff)
			if (name === 'modifier_ui_spell_amp') {
				setSpellAmp(Buffs.GetStackCount(selectedUnit, buff) / 100)
			}
		}
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Spell Amplification:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={`${spellAmp} %`} style={ParentStyles.ColumnLabel()} />
			</Panel>
		</Panel>
	)
}

export default React.memo(SpellAmplification)
