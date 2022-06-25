import ReactReconciler from 'react-reconciler';

const microtaskPromise = Promise.resolve();

export const queueMicrotask = (callback: () => void) => {
  microtaskPromise.then(callback);
}

export const reactPanoramaSymbol = Symbol('_reactPanoramaSymbol');

export type InternalPanel<T extends PanelBase = Panel> = T & {
  _reactPanoramaSymbol?: typeof reactPanoramaSymbol;
  _rootContainer?: ReactReconciler.FiberRoot;
  _eventHandlers?: Record<string, (...args: any[]) => void>;
  _rotateParams?: Partial<Record<string, number>>;
  _econItemDef?: number;
  _econItemStyle?: number;
};

export const DotaHud = (() => {
  let panel: Panel | null = $.GetContextPanel();
  while (panel) {
    if (panel.id === 'DotaHud') {
      return panel;
    }
    panel = panel.GetParent();
  }
})()!;

export const temporaryPanelHost = DotaHud.FindChild('__react_panorama_temporary_host__') ?? $.CreatePanel('Panel', DotaHud, '__react_panorama_temporary_host__');
temporaryPanelHost.RemoveAndDeleteChildren();
temporaryPanelHost.visible = false;
