export const Styles = {

  Container: (isMounted: boolean, isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "36px",
    height: "36px",
    marginRight: "5px",
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: "50%",
    boxShadow: "fill rgba(0, 0, 0, 0.3) 0px 0px 5px 2px",
    opacity: isMounted ? "1.0" : "0.0",
    preTransformScale2d: isMounted ? "1.0" : "0.0",
    transform: isHovering ? "scale3d(1.075, 1.075, 0)" : "none",
    transitionProperty: "pre-transform-scale2d, opacity, transform",
    transitionDuration: "0.35s",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }),

  Background: (isDebuff: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    clip: "radial(50% 50%, 0deg, 360deg)",
    horizontalAlign: "center",
    verticalAlign: "center",
    backgroundColor: isDebuff ? 'rgba(200, 50, 50, 0.9)' : 'rgba(0, 200, 20, 0.9)',
  }),

  Foreground: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    padding: "3.0px",
  }),

  Image: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "1px solid black",
  }),

  PaddedImage: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    padding: "-10px",
    border: "4px solid rgba(0, 0, 0, 0.5)",
  }),

}