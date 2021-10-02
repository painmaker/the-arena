export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    marginLeft: "25px",
    marginBottom: "25px",
    flowChildren: "down",
    verticalAlign: "bottom",
    zIndex: 999,
  }),

  Minimap: (): Partial<VCSSStyleDeclaration> => ({
    width: '100%',
    height: '100%',
  }),

  Overlay: (): Partial<VCSSStyleDeclaration> => ({
    borderRadius: "50%",
    opacityMask: 'url("s2r://panorama/images/softedge_circle_sharper.png") 1',
    backgroundColor: "gradient( radial, 50% 50%, 0% 0%, 300px 300px, from( #000d ), color-stop( .5, #000d ), to( #000d ) )",
    width: "300px",
    height: "300px",
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "20px",
    textAlign: "center",
    color: "orange",
    fontSize: "18px",
    textOverflow: "ellipsis",
    textShadow: "0px 0px 2px 2.0 rgba(0, 0, 0, 0.5)",
  }),


}