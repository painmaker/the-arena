import { useEffect, useRef } from 'react'
import { HUD_THINK_FAST } from '../App'

const cancel = (scheduleId: ScheduleID) => {
	try {
		$.Msg(`Canceling schedule with id ${scheduleId}`)
		$.CancelScheduled(scheduleId)
	} catch (exception) {
		$.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
	}
}

const useInterval = (callback: () => void, delay: number = HUD_THINK_FAST) => {
	const scheduleId = useRef(-1 as ScheduleID)
	const savedCallback = useRef(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const update = () => {
			savedCallback.current()
			scheduleId.current = $.Schedule(delay, update)
		}
		update()
		return () => cancel(scheduleId.current)
	}, [delay])
}

export default useInterval
