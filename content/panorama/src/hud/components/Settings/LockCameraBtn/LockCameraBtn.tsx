import React, { Dispatch, SetStateAction } from 'react'
import Styles from './styles.module.css'

type Props = {
	isLocked: boolean
	setIsLocked: Dispatch<SetStateAction<boolean>>
}

const LockCameraBtn = (props: Props) => {
	// $.Msg("REACT-RENDER: Settings - LockCameraBtn rendered");

	const { isLocked, setIsLocked } = props

	return (
		<Panel className={Styles.Container}>
			<Label className={Styles.leftLabel} text='Lock Camera:' />
			<Panel className={Styles.toggleBtnContainer}>
				<ToggleButton selected={isLocked} onactivate={() => setIsLocked(prevState => !prevState)} />
			</Panel>
			<Label className={Styles.rightLabel} text={isLocked ? 'Locked' : 'Unlocked'} />
		</Panel>
	)
}

export default React.memo(LockCameraBtn)
