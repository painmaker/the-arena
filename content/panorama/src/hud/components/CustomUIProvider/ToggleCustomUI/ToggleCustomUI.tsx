import React, { useContext } from 'react'
import { UseCustomUIContext } from '../../../context/UseCustomUIContext'
import Styles from './styles.module.css'

const ToggleCustomUI = () => {
	const { useCustomUI, setUseCustomUI } = useContext(UseCustomUIContext)

	return (
		<ToggleButton className={Styles.btn} selected={useCustomUI} onactivate={() => setUseCustomUI(prevUseCustomUI => !prevUseCustomUI)}>
			<Label className={Styles.label} text='Custom UI' />
		</ToggleButton>
	)
}

export default ToggleCustomUI
