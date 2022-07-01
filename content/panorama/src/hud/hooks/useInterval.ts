import { useCallback, useEffect, useRef } from 'react'
import { HUD_THINK_FAST } from '../App'

const useInterval = (callback: () => void, delay: number = HUD_THINK_FAST) => {
	const scheduleId = useRef<ScheduleID | undefined>(undefined)
	const savedCallback = useRef(callback)

	const update = useCallback(() => {
		savedCallback.current()
		scheduleId.current = $.Schedule(delay, update)
	}, [])

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		update()
		return () => {
			if (scheduleId.current !== undefined) {
				try {
					// $.Msg(`Canceling schedule with id ${id}`)
					$.CancelScheduled(scheduleId.current)
				} catch (exception) {
					$.Msg(`Exception for schedule with id ${scheduleId}: ${exception}`)
				}
			}
			scheduleId.current = undefined
		}
	}, [delay])
}

export default useInterval
