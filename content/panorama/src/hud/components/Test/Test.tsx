import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HUD_THINK_FAST } from '../../App'
import useInterval from '../../hooks/useInterval'
import Styles from './styles.module.css'

const SubComponent1 = React.memo(({ parentCount }: { parentCount: number }) => {
	const p = useRef(parentCount)
	const [count, setCount] = useState(0)

	useEffect(() => {
		p.current = parentCount
	}, [parentCount])

	useInterval(() => {
		setCount(prevCount => prevCount - 1)
	}, HUD_THINK_FAST)

	if (count % 2 === 0) {
		return null
	}

	return <Label className={Styles.label} text={`count: ${count}`} />
})

const Test = () => {
	const [count, setCount] = useState(0)

	useInterval(() => {
		setCount(prevCount => prevCount + 1)
	}, HUD_THINK_FAST)

	const style = useMemo(() => ({ color: count % 2 === 0 ? 'red' : 'orange' }), [count])

	const onClick = useCallback(() => {
		$.Msg(`count: ${count}`)
	}, [count])

	return (
		<Panel className={Styles.container}>
			<Button onactivate={() => onClick()}>
				<Label className={Styles.label} text={`count: ${count}`} style={style} />
			</Button>
			<SubComponent1 parentCount={count} />
		</Panel>
	)
}

export default React.memo(Test)
