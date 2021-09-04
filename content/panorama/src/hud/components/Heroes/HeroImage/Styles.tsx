const borderColor = "rgba(0, 0, 0, 0.75)"

export const Styles = {

  Container: (isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "41.4px",
    backgroundColor: 'black',
    transition: "border 0.15s ease-in-out 0.0s",
    border: isHovering ? "1.5px solid " + borderColor : "2px solid " + borderColor,
    zIndex: 998,
  }),

  Image: (washColor: string): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'center',
    washColor: washColor,
  }),

  Disconnected: (): Partial<VCSSStyleDeclaration> => ({
    zIndex: 999,
    width: '80%',
    height: '50%',
    verticalAlign: 'center',
    horizontalAlign: 'center',
  }),

}