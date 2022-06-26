import ReactReconciler from 'react-reconciler'
import { DefaultEventPriority } from 'react-reconciler/constants'
import { DotaHud, InternalPanel, temporaryPanelHost } from './utils'
import { splitInitialProps, updateProperty } from './attributes'
import { fixPanelBase, panelBaseNames } from './panel-base'
import { PanelType } from './panels'

const appendChild = (parent: InternalPanel, child: InternalPanel) => {
	console.debug('appendChild called')

	if (parent.paneltype === 'DropDown') {
		;(parent as DropDown).AddOption(child)
		return
	}

	if (parent.paneltype === 'ContextMenuScript') {
		parent = (parent as ContextMenuScriptPanel).GetContentsPanel()
	}

	if (parent === child.GetParent()) {
		parent.MoveChildAfter(child, parent.GetChild(parent.GetChildCount() - 1)!)
	} else {
		child.SetParent(parent)
	}
}

const insertBefore = (parent: InternalPanel, child: InternalPanel, beforeChild: InternalPanel) => {
	console.debug('insertBefore called')

	if (parent.paneltype === 'DropDown') {
		;(parent as DropDown).AddOption(child)
		;(parent as DropDown).AccessDropDownMenu().MoveChildBefore(child, beforeChild)
		return
	}

	if (parent.paneltype === 'ContextMenuScript') {
		parent = (parent as ContextMenuScriptPanel).GetContentsPanel()
	}

	child.SetParent(parent)

	parent.MoveChildBefore(child, beforeChild)
}

const removeChild = (parent: InternalPanel, child: InternalPanel) => {
	console.debug('removeChild called')
	if (parent.paneltype === 'DropDown') {
		;(parent as DropDown).RemoveOption(child.id)
	} else {
		child.SetParent(temporaryPanelHost)
		temporaryPanelHost.RemoveAndDeleteChildren()
		// child.DeleteAsync(0);
	}
}

const hostConfig: ReactReconciler.HostConfig<
	PanelType, // Type
	Record<string, any>, // Props
	InternalPanel, // Container
	InternalPanel, // Instance
	never, // TextInstance
	never, // SuspenseInstance
	never, // HydratableInstance
	InternalPanel, // PublicInstance
	object, // HostContext
	object, // UpdatePayload
	never, // ChildSet
	number, // TimeoutHandle
	number // NoTimeout
> = {
	supportsMutation: true,
	supportsPersistence: false,
	createInstance(type, props) {
		console.debug(`createInstance called for type ${type}`)

		const { initialProps, otherProps } = splitInitialProps(type, props)

		if (type === 'GenericPanel') {
			type = props.type
		}

		const panel = initialProps
			? $.CreatePanelWithProperties(type, $.GetContextPanel(), props.id || '', initialProps)
			: $.CreatePanel(type, $.GetContextPanel(), props.id || '')

		if (panelBaseNames.has(type)) {
			fixPanelBase(panel)
		}

		for (const prop in otherProps) {
			updateProperty(type, panel, prop, undefined, otherProps[prop])
		}

		return panel
	},
	createTextInstance() {
		console.debug('createTextInstance called')
		throw new Error('react-panorama-reconciler does not support text nodes. Use <Label /> element instead.')
	},
	appendInitialChild: appendChild,
	finalizeInitialChildren: () => {
		console.debug('finalizeInitialChildren called')
		return false
	},
	prepareUpdate: () => {
		console.debug('prepareUpdate called')
		return {}
	},
	shouldSetTextContent: () => {
		console.debug('shouldSetTextContent called')
		return false
	},
	getRootHostContext: () => {
		console.debug('getRootHostContext called')
		return null
	},
	getChildHostContext: parentHostContext => {
		console.debug('getChildHostContext called')
		return parentHostContext
	},
	getPublicInstance: instance => {
		console.debug('getPublicInstance called')
		return instance
	},
	prepareForCommit: () => {
		console.debug('prepareForCommit called')
		return null
	},
	resetAfterCommit: () => {
		console.debug('resetAfterCommit called')
	},
	preparePortalMount: () => {
		console.debug('preparePortalMount called')
	},
	scheduleTimeout: setTimeout,
	cancelTimeout: clearTimeout,
	noTimeout: -1,
	supportsMicrotask: false,
	scheduleMicrotask: () => {
		console.debug('scheduleMicrotask called')
	},
	isPrimaryRenderer: true,
	getCurrentEventPriority: () => DefaultEventPriority,
	appendChild,
	appendChildToContainer: appendChild,
	insertBefore,
	insertInContainerBefore: insertBefore,
	removeChild,
	removeChildFromContainer: removeChild,
	resetTextContent: () => {
		console.debug('resetTextContent called')
	},
	commitTextUpdate: () => {
		console.debug('commitTextUpdate called')
	},
	commitMount: () => {
		console.debug('commitMount called')
	},
	commitUpdate(panel, _updatePayload, type, oldProps, newProps, internalHandle) {
		console.debug('commitUpdate called')
		for (const propName in newProps) {
			const oldValue = oldProps[propName]
			const newValue = newProps[propName]
			if (oldValue !== newValue) {
				updateProperty(type, panel, propName, oldValue, newValue)
			}
		}
		for (const propName in oldProps) {
			if (!(propName in newProps)) {
				updateProperty(type, panel, propName, undefined, oldProps[propName])
			}
		}
	},
	hideInstance: panel => {
		console.debug('hideInstance called')
		panel.style.visibility = 'collapse'
	},
	unhideInstance: (panel, props) => {
		console.debug('unhideInstance called')
		panel.style.visibility = 'visible'
	},
	unhideTextInstance: () => {
		console.debug('unhideTextInstance called')
		throw new Error('unhideTextInstance not implemented')
	},
	clearContainer: (panel: InternalPanel) => {
		console.debug('clearContainer called')
		$.Msg('clearContainer called')
		const app = DotaHud.FindChild('__react__app__root__')
		if (app) {
			app.RemoveAndDeleteChildren()
		}
	},
	supportsHydration: false,
	getInstanceFromNode: () => {
		console.debug('getInstanceFromNode called')
		return null
	},
	getInstanceFromScope: () => {
		console.debug('getInstanceFromScope called')
		return null
	},
	beforeActiveInstanceBlur: () => {
		console.debug('beforeActiveInstanceBlur called')
	},
	afterActiveInstanceBlur: () => {
		console.debug('afterActiveInstanceBlur called')
	},
	prepareScopeUpdate: () => {
		console.debug('prepareScopeUpdate called')
	},
	detachDeletedInstance: () => {
		console.debug('detachDeletedInstance called')
	},
}

export const reconciler = ReactReconciler(hostConfig)
