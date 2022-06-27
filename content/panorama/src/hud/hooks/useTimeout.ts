import { useEffect, useLayoutEffect, useRef } from 'react'

const useTimeout = (callback: () => void, delay: number = 0) => {
	const savedCallback = useRef(callback)

	useLayoutEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const scheduleId = $.Schedule(delay, () => {
			// $.Msg(`useTimeout called with scheduleId ${scheduleId}`)
			savedCallback.current()
		})
		return () => {
			try {
				// $.Msg(`Canceling schedule with id ${scheduleId}`)
				$.CancelScheduled(scheduleId)
			} catch (exception) {
				// $.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
			}
		}
	}, [delay])
}

export default useTimeout
