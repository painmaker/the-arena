import React, { Profiler } from 'react'

const onRender = (id: any, phase: any, actualTime: any, baseTime: any, startTime: any, commitTime: any) => {
	$.Msg(
		`${id}'s ${phase} phase - Actual time: ${actualTime} | Base time: ${baseTime} | Start time: ${startTime} | Commit time: ${commitTime}`,
	)
}

const getDisplayName = <P extends object>(Component: React.ComponentType<P>) => {
	return Component.displayName || Component.name || 'Component'
}

const withProfiler = <P extends object>(Component: React.ComponentType<P>) =>
	class WithProfiler extends React.Component<P> {
		render() {
			return (
				<Profiler id={getDisplayName(Component)} onRender={onRender}>
					<Component {...this.props} />
				</Profiler>
			)
		}
	}

export default withProfiler
