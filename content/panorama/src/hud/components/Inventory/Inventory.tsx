import React, { useContext } from 'react'
import Item from './Item/Item'
import Styles from './styles.module.css'
import { SelectedEntityIndexContext } from '../../context/SelectedEntityIndexContext'

const slots = [0, 1, 2, 3, 4, 5]

const Inventory = () => {
	$.Msg('REACT-RENDER: Inventory rendered')

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	if (!Entities.IsInventoryEnabled(selectedEntityIndex)) {
		return null
	}

	return (
		<Panel hittest={false} className={Styles.container}>
			<Panel className={Styles.items}>
				{slots.map(slot => (
					<Item key={slot} slot={slot} />
				))}
			</Panel>
		</Panel>
	)
}

export default React.memo(Inventory)
