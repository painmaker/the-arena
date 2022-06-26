import React, { useState } from 'react'
import { WINDOW } from '../../../data/windows'
import { Styles } from './Styles'

type Props = {
	selectedUnit: EntityIndex
}

const Title = (props: Props) => {
	// $.Msg("REACT-RENDER: Character - Title rendered");

	const { selectedUnit } = props

	const [isHovering, setIsHovering] = useState(false)

	return (
		<Panel style={Styles.Container()}>
			<Label style={Styles.Label()} text={`CHARACTER - ${$.Localize(`#${Entities.GetUnitName(selectedUnit)}`).toUpperCase()}`} />
			<Button
				onmouseover={() => setIsHovering(true)}
				onmouseout={() => setIsHovering(false)}
				style={Styles.CloseBtn(isHovering)}
				onactivate={() => {
					GameEvents.SendEventClientSide('set_window', { window: WINDOW.NONE })
					Game.EmitSound('ui_topmenu_select')
				}}
			>
				<Image src='s2r://panorama/images/close_btn_white_png.vtex' />
			</Button>
		</Panel>
	)
}

export default React.memo(Title)
