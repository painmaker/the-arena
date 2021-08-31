export const Styles = {

  Container: (isItemDragged: boolean, isItemDropTarget: boolean, isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "55px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid black",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    backgroundImage: 'url("s2r://panorama/images/emptyitembg.png")',
    backgroundSize: "100%",
    transition: "transform 0.1s ease-in-out 0s",
    saturation: (isItemDragged || isItemDropTarget) ? '0.5' : '1.0',
    washColor: (isItemDragged || isItemDropTarget) ? '#808080' : 'none',
    transform: isHovering ? 'scale3d(1.02, 1.02, 1.0)' : 'scale3d(1.0, 1.0, 1.0)',
  }),

}