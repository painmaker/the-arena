import { MinimapActionTypes, SET_MINIMAP_ZOOM } from "../types/minimapTypes";

export function setMinimapZoom(zoom: number): MinimapActionTypes {
  return {
    type: SET_MINIMAP_ZOOM,
    payload: zoom
  }
}