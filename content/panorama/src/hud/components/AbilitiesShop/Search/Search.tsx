import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Styles from './styles.module.css'

type Props = {
	searchValue: string
	setSearchValue: Dispatch<SetStateAction<string>>
}

const Search = (props: Props) => {
	// $.Msg("REACT-RENDER: AbilitiesShop - Search rendered");

	const { searchValue, setSearchValue } = props

	useEffect(() => {
		return () => setSearchValue('')
	}, [])

	return (
		<Panel className={Styles.container}>
			<Panel className={Styles.icon} />
			<TextEntry
				id='abilitiesShopSearchFieldId'
				className={Styles.searchField}
				maxchars={50}
				placeholder='Search...'
				text={searchValue}
				ontextentrychange={event => setSearchValue(event.text.toLocaleLowerCase().trim())}
			/>
			<Button className={Styles.clearBtn} onactivate={() => (($('#abilitiesShopSearchFieldId') as TextEntry).text = '')} />
		</Panel>
	)
}

export default React.memo(Search)
