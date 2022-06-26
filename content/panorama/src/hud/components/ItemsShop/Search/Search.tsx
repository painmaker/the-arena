import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Styles from './styles.module.css'

type Props = {
	setSearchValue: Dispatch<SetStateAction<string>>
}

function Search(props: Props) {
	// $.Msg("REACT-RENDER: ItemsShop - Search rendered");

	const { setSearchValue } = props

	useEffect(() => {
		return () => setSearchValue('')
	}, [setSearchValue])

	return (
		<Panel className={Styles.container}>
			<Panel className={Styles.icon} />
			<TextEntry
				id='shopSearchFieldId'
				className={Styles.searchField}
				maxchars={50}
				placeholder='Search...'
				ontextentrychange={event => setSearchValue(event.text.toLocaleLowerCase().trim())}
			/>
			<Button className={Styles.clearBtn} onactivate={() => (($('#shopSearchFieldId') as TextEntry).text = '')} />
		</Panel>
	)
}

export default React.memo(Search)
