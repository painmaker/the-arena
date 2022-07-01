import { useEffect, useRef } from 'react'
import { HUD_THINK_FAST } from '../App'

const useInterval = (callback: () => void, delay: number = HUD_THINK_FAST) => {
	const savedCallback = useRef(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		let scheduleId: ScheduleID | null = null
		function update() {
			scheduleId = null
			savedCallback.current()
			scheduleId = $.Schedule(delay, update)
		}
		update()
		return () => {
			if (scheduleId !== null) {
				try {
					// $.Msg(`Canceling schedule with id ${id}`)
					$.CancelScheduled(scheduleId)
				} catch (exception) {
					$.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
				}
				scheduleId = null
			}
		}
	}, [delay])
}

export default useInterval
