import React, { useState } from 'react'
import useInterval from '../../hooks/useInterval'

const interval = 1

const Test = () => {
	const [count, setCount] = useState(0)

	useInterval(() => {
		setCount(prevCount => {
			$.Msg(`Adding 1 to prevCount ${prevCount}`)
			return prevCount + 1
		})
	}, interval)

	return <Label text={`count: ${count}`} />
}

export default React.memo(Test)
