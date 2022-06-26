import React from 'react'
import Styles from './styles.module.css'

function Divider() {
	// $.Msg("REACT-RENDER: Settings - Divider rendered");

	return <Panel className={Styles.container} />
}

export default React.memo(Divider)
