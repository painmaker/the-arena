import ReactReconciler from 'react-reconciler';
import { InternalPanel, temporaryPanelHost } from './utils';
import { splitInitialProps, updateProperty } from './attributes';
import { fixPanelBase, panelBaseNames } from './panel-base';
import { PanelType } from './panels';
import { DefaultEventPriority } from 'react-reconciler/constants';

const appendChild = (parent: InternalPanel, child: InternalPanel) => {

  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).AddOption(child);
    return;
  }

  if (parent.paneltype === 'ContextMenuScript') {
    parent = (parent as ContextMenuScriptPanel).GetContentsPanel();
  }

  if (parent === child.GetParent()) {
    parent.MoveChildAfter(child, parent.GetChild(parent.GetChildCount() - 1)!);
  } else {
    child.SetParent(parent);
  }

}

const insertBefore = (parent: InternalPanel, child: InternalPanel, beforeChild: InternalPanel) => {

  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).AddOption(child);
    (parent as DropDown).AccessDropDownMenu().MoveChildBefore(child, beforeChild);
    return;
  }

  if (parent.paneltype === 'ContextMenuScript') {
    parent = (parent as ContextMenuScriptPanel).GetContentsPanel();
  }

  child.SetParent(parent);
  
  parent.MoveChildBefore(child, beforeChild);

}

const removeChild = (parent: InternalPanel, child: InternalPanel) => {
  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).RemoveOption(child.id);
  } else {
    child.SetParent(temporaryPanelHost);
    temporaryPanelHost.RemoveAndDeleteChildren();
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
  createInstance(type, newProps) {

    const { initialProps, otherProps } = splitInitialProps(type, newProps);

    if (type === 'GenericPanel') {
      type = newProps.type;
    }

    const panel = initialProps
      ? $.CreatePanelWithProperties(type, $.GetContextPanel(), newProps.id || '', initialProps)
      : $.CreatePanel(type, $.GetContextPanel(), newProps.id || '');

    if (panelBaseNames.has(type)) {
      fixPanelBase(panel);
    }

    for (const propName in otherProps) {
      updateProperty(type, panel, propName, undefined, otherProps[propName]);
    }

    return panel;

  },
  createTextInstance() { 
    throw new Error('react-panorama-reconciler does not support text nodes. Use <Label /> element instead.') 
  },
  appendInitialChild: appendChild,
  finalizeInitialChildren: () => false,
  prepareUpdate: () => ({}),
  shouldSetTextContent: () => false,
  getRootHostContext: () => null,
  getChildHostContext: (parentHostContext, type, rootContainer) => parentHostContext,
  getPublicInstance: (instance) => instance,
  prepareForCommit: (containerInfo) => null,
  resetAfterCommit: () => {},
  preparePortalMount: () => {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  supportsMicrotask: false,
  // scheduleMicrotask: () => {},
  isPrimaryRenderer: true,
  getCurrentEventPriority: () => DefaultEventPriority,
  appendChild,
  appendChildToContainer: appendChild,
  insertBefore,
  insertInContainerBefore: insertBefore,
  removeChild,
  removeChildFromContainer: removeChild,
  resetTextContent: () => {},
  commitTextUpdate: () => {},
  commitMount: () => {},
  commitUpdate(panel, _updatePayload, type, oldProps, newProps, internalHandle) {
    for (const propName in newProps) {
      const oldValue = oldProps[propName];
      const newValue = newProps[propName];
      if (oldValue !== newValue) {
        updateProperty(type, panel, propName, oldValue, newValue);
      }
    }
    for (const propName in oldProps) {
      if (!(propName in newProps)) {
        updateProperty(type, panel, propName, undefined, oldProps[propName]);
      }
    }
  },
  hideInstance: (panel) => { 
    panel.style.visibility = 'collapse'; 
  },
  unhideInstance: (panel, props) => {
    panel.style.visibility = 'visible';
  },
  unhideTextInstance: () => {},
  clearContainer: (panel) => {
    $.Msg("clearContainer called")
    // panel.RemoveAndDeleteChildren();
  },
  supportsHydration: false,
  getInstanceFromNode: () => null, 
  getInstanceFromScope: () => null, 
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {}, 
  prepareScopeUpdate: () => {},
  detachDeletedInstance: () => {},
  
};

export const reconciler = ReactReconciler(hostConfig);
