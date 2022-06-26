import React from 'react'
import ActiveItem from './ActiveItem/ActiveItem'
import Styles from './styles.module.css'

type Props = {
	activeItem: ItemsShopItem
}

const UpgradeTree = (props: Props) => {
	const { activeItem } = props

	return <Panel className={Styles.container}>{activeItem !== undefined && <ActiveItem activeItem={activeItem} />}</Panel>
}

export default UpgradeTree
