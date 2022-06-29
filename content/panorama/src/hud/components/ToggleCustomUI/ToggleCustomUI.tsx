import React, { useContext } from 'react'
import { RenderContext } from '../../context/RenderContext'
import Styles from './styles.module.css'

const ToggleCustomUI = () => {
	const { visible, setVisible } = useContext(RenderContext)

	return (
		<ToggleButton className={Styles.btn} selected={visible} onactivate={() => setVisible(prevValue => !prevValue)}>
			<Label className={Styles.label} text='Custom UI' />
		</ToggleButton>
	)
}

export default ToggleCustomUI
