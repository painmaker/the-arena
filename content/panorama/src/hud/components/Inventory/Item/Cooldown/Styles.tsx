export const Styles = {

  Container: (degree: number): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: "100%",
    zIndex: 40,
    backgroundColor: "rgba(20, 20, 20, 0.85)",
    clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)'
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    fontSize: "24px",
    color: "white",
    textShadow: "1px 1px 2px 4 #000000",
    horizontalAlign: "middle",
    verticalAlign: "middle",
    zIndex: 60,
    textAlign: "center",
  }),

}