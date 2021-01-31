export const SET_MINIMAP_ZOOM = 'SET_MINIMAP_ZOOM'

interface SetMinimapZoomAction {
  type: typeof SET_MINIMAP_ZOOM
  payload: number
}

export type MinimapActionTypes = SetMinimapZoomAction;