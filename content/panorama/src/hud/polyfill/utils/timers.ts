export const setTimeout = <TArgs extends any[]>(callback: (...args: TArgs) => void, timeout = 0, ...args: TArgs): number => {
	return $.Schedule(timeout / 1000, () => {
		callback(...args)
	})
}

export const setInterval = <TArgs extends any[]>(callback: (...args: TArgs) => void, timeout = 0, ...args: TArgs): number => {
	throw new Error('timers.setInterval not implemented!')
}

export const setImmediate = <TArgs extends any[]>(callback: (...args: TArgs) => void, ...args: TArgs): number => {
	return $.Schedule(0, () => callback(...args))
}

const clearTimer = (handle?: number) => {
	try {
		$.Msg(`timers.clearTimer with id ${handle}`)
		$.CancelScheduled(handle as ScheduleID)
	} catch (exception) {
		$.Msg(`timers.clearTimer expcetion ${exception} with id ${handle}`)
	}
}

export { clearTimer as clearTimeout, clearTimer as clearInterval, clearTimer as clearImmediate }
